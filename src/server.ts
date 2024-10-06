import Application from './app';

const PORT = process.env.PORT || 3000;

Application.listen(PORT, 
  () => console.log('Server Running 🔥 On Port:', `${PORT}`));