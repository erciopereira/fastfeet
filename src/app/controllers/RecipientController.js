import * as Yup from 'yup';
import Recipients from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      zipcode: Yup.string().required(),
      stret: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      zipcode,
      stret,
      number,
      complement,
      state,
      city,
    } = await Recipients.create(req.body);

    return res.json({
      id,
      name,
      zipcode,
      stret,
      number,
      complement,
      state,
      city,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      zipcode: Yup.string(),
      stret: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipients.findByPk(req.params.id);

    const {
      name,
      zipcode,
      stret,
      number,
      complement,
      state,
      city,
    } = await recipient.update(req.body);

    return res.json({
      name,
      zipcode,
      stret,
      number,
      complement,
      state,
      city,
    });
  }
}

export default new RecipientController();
