const formatSerializedId = (serializedId) => {
  // Remover la parte '@c.us' si está presente
  const number = serializedId?.replace('@c.us', '');

  // Devolver el número sin modificarlo
  return number;
};

export default formatSerializedId;
