const BASE_URL = 'http://localhost:5000';

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

export const COMMENTS_URL = BASE_URL + '/api/comments';
export const COMMENTS_ALL_BY_FOOD_URL = COMMENTS_URL + '/all/';
export const COMMENTS_LATEST_BY_FOOD_URL = COMMENTS_URL + '/latest-three/';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDERS_CREATE_URL = ORDERS_URL + '/create';
export const ORDERS_NEW_CURRENT_USER_URL = ORDERS_URL + '/new-order-current-user';
export const ORDERS_PAY_URL = ORDERS_URL + '/pay';
export const ORDERS_GET_BY_ID_URL = ORDERS_URL + '/track/';
export const ORDERS_PAID_URL = ORDERS_URL + '/paid-orders';
