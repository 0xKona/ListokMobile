import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Listok from '../models/Listok.js';

const router = express.Router();

router.post('/create_new_listok', authMiddleware, async (req, res) => {
  const listokData = req.body;
  console.log('Recieved new create listok request: ', listokData);
  if (!listokData.title || !listokData.createdBy) {
    console.log('create_new_listok api missing params triggered: ', {
      title: !listokData.title,
      createdBy: !listokData.createdBy,
    });
    res
      .status(400)
      .json({ message: 'Error: Listok not saved, missing parameters' });
    return;
  }

  try {
    const newListok = new Listok({
      title: listokData.title,
      desc: listokData.desc,
      picture: listokData.picture,
      days: JSON.stringify(listokData.days),
      createdBy: listokData.createdBy,
      createdByName: listokData.createdByName,
      createdOn: Date.now(),
    });
    await newListok.save();
    res.status(200).json({ message: ' Success: Listok Saved! ' });
    return;
  } catch (error) {
    console.log('Failed to add Listok for the following reason: ', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, please try again' });
    return;
  }
});

router.get('/get_listoks/user=:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching Listoks for user: ', userId);

  try {
    const listoks = await Listok.find({ createdBy: userId });
    if (listoks.length === 0) {
      res.status(204).json([]);
      return;
    }
    res.status(200).json(listoks);
    return;
  } catch (error) {
    console.log('Failed to fetch Listoks: ', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, Please try again.' });
    return;
  }
});

router.delete(
  '/delete_listok/listok=:listokId',
  authMiddleware,
  async (req, res) => {
    const { listokId } = req.params;
    console.log(
      '[Server]: Delete listok request recieved for listokId: ',
      listokId,
    );

    try {
      await Listok.deleteOne({ _id: listokId });
      console.log('[Server]: Listok ', listokId, ' deleted successfully');
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error, failed to delete listok' });
    }
  },
);

router.put('/edit_listok/', authMiddleware, async (req, res) => {
  const listokData = req.body;
  console.log('received edit listok request:', listokData);

  if (!listokData.id || !listokData.title || !listokData.createdBy) {
    console.log('missing params triggered');
    res
      .status(400)
      .json({ message: 'Error: Listok not saved, missing parameters' });
    return;
  }

  try {
    const updateData = {
      title: listokData.title,
      desc: listokData.desc || null,
      createdBy: listokData.createdBy,
      createdByName: listokData.createdByName,
      createdOn: listokData.createdOn || Date.now(),
      public: listokData.public,
      picture: listokData.picture || null,
      ingredients: JSON.stringify(listokData.ingredients) || null,
      method: JSON.stringify(listokData.method) || null,
    };

    await Listok.updateOne({ _id: listokData.id }, { $set: updateData });
    res.status(200).json({ message: 'Success: Listok updated' });
  } catch (error) {
    console.log('Failed to update listok: ', error);
    res
      .status(500)
      .json({ message: 'Error: Internal Server Error, please try again.' });
  }
});

export default router;
