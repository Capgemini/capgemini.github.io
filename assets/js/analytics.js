var socialButtons = document.querySelectorAll('.notepad-post-share a');

for (var i = 0; i < socialButtons.length; i++) {
    socialButtons[i].addEventListener('click', function (e) {
        var network = e.currentTarget.getAttribute('data-network');
        ga('send', {
            hitType: 'social',
            socialNetwork: network,
            socialAction: 'share',
            socialTarget: window.location.href
        });

        gtag('event', 'socialShare', {
            'event_category': 'engagement',
            'event_label': network
        });
    });
}
