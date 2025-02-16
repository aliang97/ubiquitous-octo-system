const idCreator = function* () {
  let i = 0;
  while (true) yield i++;
};

const idsGenerator = idCreator();
export const generateId = () => {
  const timestamp = new Date().getTime().toString(16);
  const unique = idsGenerator.next().value;
  return `e-${unique}-${timestamp}`;
};
