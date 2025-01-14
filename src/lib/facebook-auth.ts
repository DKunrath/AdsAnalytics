export const FB_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

export function initFacebookSDK() {
  return new Promise<void>((resolve) => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
      resolve();
    };

    // Load Facebook SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}