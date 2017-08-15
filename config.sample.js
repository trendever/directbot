var config = {
  /**
   * Connection to remote server config.
   */
  socket_server: {
    url: "https://dev.trendever.com/channel"
  },
  /**
   * Webserver config.
   */
  webserver: {
    port: 3000
  },

  raven: {
    enabled: true,
    url: "",
  },

  /**
   * Mixpanel analytics
   */
  mixpanel: {
    token: "28b7f9270a9a491f44167767767770c6"
  },

  /**
   * Other
   */

  service_user_id: 3996,

  info_id: 40846,

  support_id: 40844,

  activate_monetization: false,

  edit_product_id: 32929,

  connect_assistant_id: 43641,

  service_product_id: 32158,

  promo_product_id: 21499,

  monetization_help_id: 32069,

  options_product_id: 32158,

  bloger_product_id: 30683,

  trendever: false,

  testBrowserStandalone: false

};


module.exports = config;
