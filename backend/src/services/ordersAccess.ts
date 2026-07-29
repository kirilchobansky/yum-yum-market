export interface OrderAccessUser {
  isAdmin?: boolean;
  id?: string;
}

export const getOrderQueryForUser = (user?: OrderAccessUser) => {
  if (user?.isAdmin) {
    return {};
  }

  if (user?.id) {
    return { user: user.id };
  }

  return {};
};
