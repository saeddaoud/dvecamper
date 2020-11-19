import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    meg: 'Show all bootcamps',
  });
});
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    meg: `Show  bootcamp ${req.params.id}`,
  });
});
router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    meg: 'Create a bootcamp',
  });
});
router.put('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    meg: `Update  bootcamp ${req.params.id}`,
  });
});
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    meg: `Delete  bootcamp ${req.params.id}`,
  });
});

export default router;
