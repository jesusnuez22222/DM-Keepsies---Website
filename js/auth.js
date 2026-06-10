/**
 * Shared auth state — include after Supabase CDN on any page.
 * Checks session and updates the navbar login/user area.
 */
(function () {
  var SUPABASE_URL = 'https://boxudirhejtzklnpnxfw.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_j9kJoHJXwKXQcXY-ginFKQ_p5eilcPr';

  document.addEventListener('DOMContentLoaded', async function () {
    if (typeof supabase === 'undefined') return;

    var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window._sb = sb;

    var loginBtn  = document.getElementById('navLoginBtn');
    var userArea  = document.getElementById('navUserArea');
    var mobileLoginBtn = document.getElementById('mobileLoginBtn');
    var mobileUserArea = document.getElementById('mobileUserArea');

    var { data: { user } } = await sb.auth.getUser();

    if (user) {
      var name = (user.user_metadata && user.user_metadata.full_name)
        ? user.user_metadata.full_name.split(' ')[0]
        : user.email.split('@')[0];

      if (loginBtn)  loginBtn.style.display = 'none';
      if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';

      if (userArea) {
        userArea.innerHTML =
          '<span class="nav-user-greeting">Hi, ' + name + '</span>' +
          '<button class="btn btn-sm nav-logout-btn" id="navLogout">Logout</button>';
        userArea.style.display = 'flex';
      }
      if (mobileUserArea) {
        mobileUserArea.innerHTML =
          '<span class="mobile-greeting">Hi, ' + name + '</span>' +
          '<button class="mobile-logout-btn" id="mobileLogout">Logout</button>';
        mobileUserArea.style.display = 'flex';
      }

      document.querySelectorAll('#navLogout, #mobileLogout').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          await sb.auth.signOut();
          window.location.reload();
        });
      });

    } else {
      if (loginBtn)  loginBtn.style.display = '';
      if (mobileLoginBtn) mobileLoginBtn.style.display = '';
      if (userArea)  userArea.style.display = 'none';
      if (mobileUserArea) mobileUserArea.style.display = 'none';
    }
  });
})();
