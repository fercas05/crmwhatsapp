export default {
  formId: 'checkoutForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'nombre completo*',
      requiredErrorMsg: 'El nombre completo es Obligatorio.'
    },
    lastName: {
      name: 'lastName',
      label: 'Apellido*',
      requiredErrorMsg: 'Se requiere apellido'
    },
    address1: {
      name: 'address2',
      label: 'DIRECCIÓN*',
      requiredErrorMsg: 'La dirección es obligatoria'
    },

    city: {
      name: 'city',
      label: 'Ciudad*',
      requiredErrorMsg: 'la ciudad es obligatoria'
    },
    state: {
      name: 'state',
      label: 'Estado*',
      requiredErrorMsg: 'la ciudad es obligatoria'
    },
    zipcode: {
      name: 'zipcode',
      label: 'CPF/CNPJ*',
      requiredErrorMsg: 'El código postal es obligatorio.',
      invalidErrorMsg: 'Formato de código postal no válido'
    },
    country: {
      name: 'country',
      label: 'País*',
      requiredErrorMsg: 'El país es obligatorio'
    },
    useAddressForPaymentDetails: {
      name: 'useAddressForPaymentDetails',
      label: 'Utilice esta dirección para obtener detalles de pago'
    },
    nameOnCard: {
      name: 'nameOnCard',
      label: 'Nombre en la tarjeta*',
      requiredErrorMsg: 'Se requiere el nombre en la tarjeta'
    },
    cardNumber: {
      name: 'cardNumber',
      label: 'Número de tarjeta*',
      requiredErrorMsg: 'Se requiere el número de tarjeta',
      invalidErrorMsg: 'El número de tarjeta no es válido (por ejemplo, 4111111111111)'
    },
    expiryDate: {
      name: 'expiryDate',
      label: 'Fecha de expiración*',
      requiredErrorMsg: 'Se requiere fecha de caducidad',
      invalidErrorMsg: 'La fecha de caducidad no es válida.'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV*',
      requiredErrorMsg: 'Se requiere CVV',
      invalidErrorMsg: 'CVV no es válido (por ejemplo, 357)'
    }
  }
};
