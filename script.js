        function updateTime() {
            const now = new Date();
            const currentTimeElement = document.getElementById('current-time');
            currentTimeElement.textContent = now.toLocaleTimeString();
        }

        function setAlarm() {
            const alarmTime = document.getElementById('alarm-time').value;
            const now = new Date();
            const alarmDate = new Date(now.toDateString() + ' ' + alarmTime);
            const timeUntilAlarm = alarmDate - now;

            if (timeUntilAlarm <= 0) {
                alert('Please select a future time for the alarm.');
                return;
            }

            // Display the alarm set message
            const alarmSetMessage = document.getElementById('alarm-set-message');
            const alarmSetTime = document.getElementById('alarm-set-time');
            alarmSetTime.textContent = alarmDate.toLocaleTimeString();
            alarmSetMessage.style.display = 'block';

            setTimeout(function() {
                showNotification();
            }, timeUntilAlarm);
        }

        function showNotification() {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Alarm Triggered', {
                    body: 'Your alarm time has been reached!',
                    icon: 'pngtree-alarm-clock-icon-alarm-clock-that-sounds-loudly-in-the-morning-png-image_5299951.jpg' 
                });
            } else if ('Notification' in window && Notification.permission !== 'denied') {
                Notification.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        showNotification();
                    }
                });
            }
        }

        setInterval(updateTime, 1000);
        const modeToggle = document.getElementById('mode-toggle');
        const body = document.body;
        modeToggle.addEventListener('change', () => {
            if (modeToggle.checked) {
               
                body.classList.add('dark-mode');
            } else {
               
                body.classList.remove('dark-mode');
            }
        });