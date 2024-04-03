const BASE_URL = 'http://localhost:3000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tags/';
export const FOODS_BY_ID_URL = FOODS_URL + '/details/';

export const USERS_URL = BASE_URL + '/api/users';
export const USERS_LOGIN_URL = USERS_URL + '/login';
export const USERS_REGISTER_URL = USERS_URL + '/register';
export const USERS_LIKE_FOOD = USERS_URL + '/like/';
export const USERS_DISLIKE_FOOD = USERS_URL + '/dislike/';
export const USERS_UPDATE_URL = USERS_URL + '/update-user-details';
export const USERS_FAVORITE_FOODS_URL = USERS_URL + '/favorite-foods';

export const COMMENTS_URL = BASE_URL + '/api/comments';
export const COMMENTS_ALL_BY_FOOD_URL = COMMENTS_URL + '/all/';
export const COMMENTS_LATEST_BY_FOOD_URL = COMMENTS_URL + '/latest-three/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDERS_CREATE_URL = ORDERS_URL + '/create';
export const ORDERS_PAY_URL = ORDERS_URL + '/pay';
export const ORDERS_GET_BY_ID_URL = ORDERS_URL + '/track/';
export const ORDERS_GET_NEW_BY_USER_URL = ORDERS_URL + '/new-orders-by-user';
export const ORDERS_GET_PAID_BY_USER_URL = ORDERS_URL + '/paid-orders-by-user';
export const ORDERS_GET_CANCELLED_BY_USER_URL = ORDERS_URL + '/cancelled-orders-by-user';
export const ORDERS_GET_SHIPPED_BY_USER_URL = ORDERS_URL + '/shipped-orders-by-user';
export const ORDERS_GET_RETURNED_BY_USER_URL = ORDERS_URL + '/returned-orders-by-user';
export const ORDERS_PATCH_PAID_URL = ORDERS_URL + '/pay-order-as-admin';
export const ORDERS_PATCH_CANCELLED_URL = ORDERS_URL + '/cancel-order';
export const ORDERS_PATCH_SHIPPED_URL = ORDERS_URL + '/shipped-order';
export const ORDERS_PATCH_RETURNED_URL = ORDERS_URL + '/return-order';
export const ORDERS_DELETE_ONE_URL = ORDERS_URL + '/delete-order/';
export const ORDERS_GET_NEW_URL = ORDERS_URL + '/new-orders';
export const ORDERS_GET_PAID_URL = ORDERS_URL + '/paid-orders';
export const ORDERS_GET_CANCELLED_URL = ORDERS_URL + '/cancelled-orders';
export const ORDERS_GET_SHIPPED_URL = ORDERS_URL + '/shipped-orders';
export const ORDERS_GET_RETURNED_URL = ORDERS_URL + '/returned-orders';
export const OREDRS_BY_SEARCH_URL = ORDERS_URL + '/search/';
export const OREDRS_GET_ALL_URL = ORDERS_URL + '/all';
