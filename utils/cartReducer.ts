export default function cartReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'add-item':
      return [{ ...payload, quantity: 1 }, ...state];
    case 'change-quantity':
      return state.map(item =>
        item.id !== payload.id ? item : { ...item, quantity: item.quantity + payload.quantity }
      );
    case 'remove-item':
      return state.filter(item => item.id !== payload.id);
    case 'set-cart':
      return payload;
    case 'reset-cart':
      return [];
    default:
      return state;
  }
}
