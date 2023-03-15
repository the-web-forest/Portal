const ANALYTICS_EVENTS = {
  USER_SIGN_IN: 'user_sign_in',
  USER_GOOGLE_SIGN_IN: 'user_google_sign_in',
  USER_SIGN_OUT: 'user_sign_out',
  USER_REGISTERED: 'user_registered',

  USER_GO_TO_CHECKOUT: 'user_go_to_checkout',
  USER_GO_TO_CHECKOUT_FROM_EMPTY_CART: 'user_go_to_checkout_from_empty_cart',
  USER_PAYMENT_SUCCESS: 'user_payment_success',
  USER_PAYMENT_FAILURE: 'user_payment_failure',
  USER_PRESSED_PAYMENT_BUTTON: 'user_pressed_payment_button',
  USER_PRESSED_PLANT_NOW_BUTTON: 'user_pressed_plant_now_button',
  USER_REMOVED_ITEM_FROM_CART: 'user_removed_item_from_cart',
  USER_ADDED_ITEM_QUANTITY_TO_CART: 'user_added_item_quantity_to_cart',
  USER_REMOVED_ITEM_QUANTITY_FROM_CART: 'user_removed_item_quantity_from_cart',
  USER_ADDED_ITEM_QUANTITY_TO_CART_ON_NURSERY:
    'user_added_item_quantity_to_cart_on_nursery',
  USER_REMOVED_ITEM_QUANTITY_TO_CART_ON_NURSERY:
    'user_removed_item_quantity_to_cart_on_nursery',

  USER_UPDATED_PROFILE: 'user_updated_profile',
  USER_CHANGED_BIOME: 'user_changed_biome',

  USER_CLICKED_SIDE_MENU_GO_TO_NURSERY_DESKTOP:
    'user_clicked_side_menu_go_to_nursery_desktop',
  USER_CLICKED_SIDE_MENU_GO_TO_FOREST_DESKTOP:
    'user_clicked_side_menu_go_to_forest_desktop',
  USER_CLICKED_SIDE_MENU_GO_TO_MY_ACCOUNT_DESKTOP:
    'user_clicked_side_menu_go_to_my_account_desktop',
  USER_CLICKED_SIDE_MENU_GO_TO_NURSERY_MOBILE:
    'user_clicked_side_menu_go_to_nursery_mobile',
  USER_CLICKED_SIDE_MENU_GO_TO_FOREST_MOBILE:
    'user_clicked_side_menu_go_to_forest_mobile',
  USER_CLICKED_SIDE_MENU_GO_TO_MY_ACCOUNT_MOBILE:
    'user_clicked_side_menu_go_to_my_account_mobile',
  USER_CLICKED_GO_TO_CART_IN_HEADER: 'user_clicked_go_to_cart_in_header',
  USER_CLICKED_ON_LOGO: 'user_clicked_on_logo',
  USER_OPENED_MOBILE_MENU: 'user_opened_mobile_menu',
  USER_CLOSED_MOBILE_MENU: 'user_closed_mobile_menu',
  USER_TOGGLED_MENU_DESKTOP: 'user_toggled_menu_desktop',
};

export default ANALYTICS_EVENTS;
