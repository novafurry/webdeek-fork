$(document).ready(touch);

function touch() {
    var zIndex = 1;

    $('.titlebar').not('.dragged').on('mousedown touchstart', function (event) {
        var $window = $(this).closest('.window');
        if (!$window.hasClass('max')) {
            var offsetX, offsetY;
            var resistance = 3;
            $window.css('z-index', zIndex++);

            if (event.type === 'mousedown') {
                $window.addClass('dragging');
                offsetX = event.clientX - $window.offset().left;
                offsetY = event.clientY - $window.offset().top;
            } else if (event.type === 'touchstart') {
                $window.addClass('dragging');
                var touch = event.originalEvent.touches[0];
                offsetX = touch.clientX - $window.offset().left;
                offsetY = touch.clientY - $window.offset().top;
            }

            $(document).on('mousemove touchmove', function (event) {
                var newX, newY;
                if (event.type === 'mousemove') {
                    newX = event.clientX - offsetX;
                    newY = event.clientY - offsetY;
                } else if (event.type === 'touchmove') {
                    var touch = event.originalEvent.touches[0];
                    newX = touch.clientX - offsetX;
                    newY = touch.clientY - offsetY;
                }

                if (Math.abs(newX - $window.offset().left) > resistance ||
                    Math.abs(newY - $window.offset().top) > resistance) {
                    $window.offset({ top: newY, left: newX });
                }
            });

            $(document).on('mouseup touchend', function () {
                $(document).off('mousemove touchmove');
                $window.removeClass('dragging');
            });

            document.body.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, { passive: false });

            $window.addClass('dragged');
        }
    });
}


function gen(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mkw(contents, titlebarText, width, height, c, m, a) {
    var windowDiv = document.createElement('div');
    windowDiv.classList.add('window');
    windowDiv.id = gen(8);
    windowDiv.style.width = width;
    windowDiv.style.height = height;
    var titlebarDiv = document.createElement('div');
    titlebarDiv.classList.add('titlebar');
    var navigationButtonsDiv = document.createElement('div');
    navigationButtonsDiv.classList.add('tnav');
    var closeButton = document.createElement('div');
    closeButton.classList.add('winb');
    if (c === undefined) {
        closeButton.classList.add('red');
        closeButton.addEventListener('click', function () {
            clapp(windowDiv.id); dest(windowDiv.id, 100);
        });
    }

    var minimizeButton = document.createElement('div');
    minimizeButton.classList.add('winb');
    if (m === undefined) {
        minimizeButton.classList.add('yel');
        minimizeButton.addEventListener('click', function () {
            mini(windowDiv.id);
        });
    }
    var maximizeButton = document.createElement('div');
    maximizeButton.classList.add('winb');
    if (a === undefined) {
        maximizeButton.classList.add('gre');
        maximizeButton.addEventListener('click', function () {
            max(windowDiv.id);
        });
    }
    navigationButtonsDiv.appendChild(closeButton);
    navigationButtonsDiv.appendChild(minimizeButton);
    navigationButtonsDiv.appendChild(maximizeButton);
    titlebarDiv.appendChild(navigationButtonsDiv);
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titlebarText;
    titlebarDiv.appendChild(titleDiv);
    windowDiv.appendChild(titlebarDiv);
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    windowDiv.appendChild(contentDiv);
    document.body.appendChild(windowDiv);
    contentDiv.innerHTML = contents;
    touch(); opapp(windowDiv.id, titlebarText);
}

function opapp(id, name) {
    hidef('gomenu');
    const div = document.getElementById(id);
    const check = document.getElementById("btn_" + id);
    if (div && !check) {
        showf(id);
        const btn = document.createElement('button');
        btn.className = "b3";
        btn.id = "btn_" + id;
        btn.innerText = name;
        btn.onclick = function () {
            maxi(id);
        };
        document.getElementById('taskbar').appendChild(btn);
    } else {
        log('<!> Error making window.');
        log('   <i> Window: ' + div);
        log('   <i> Button: ' + check);
    }
}

function log(c) {
    console.log(c);
}

function clapp(id) {
    const div = document.getElementById(id);
    if (div) {
        hidef(id);
        const fuck = "btn_" + id;
        dest(fuck);
    }
}


function max(id) {
    const wid = document.getElementById(id);
    if (wid) {
        wid.classList.toggle('max');
        if (!wid.classList.contains('max')) {
            wid.classList.add('unmax');
            setTimeout(() => {
                wid.classList.remove('unmax');
            }, 301);
        }
    }
}

var originalPositions = {};

function mini(window) {
    var currentPosition = $('#' + window).position();
    originalPositions[window] = {
        top: currentPosition.top,
        left: currentPosition.left
    };
    $('#' + window).animate({
        'left': '50%',
        'top': '100%',
        'transform': 'translateX(-50%) scale(0.2)',
        'opacity': '1'
    }, 200, function () {
        $('#' + window).hide();
    });
}

function maxi(window) {
    $('#' + window).show();
    var originalPosition = originalPositions[window];
    if (originalPosition) {
        $('#' + window).animate({
            'transform': 'translateX(-50%) scale(1)',
            'opacity': '1',
            'left': originalPosition.left,
            'top': originalPosition.top
        }, 200, function () {
            $('#' + window).css({
                'top': originalPosition.top,
                'left': originalPosition.left,
            })
        });
    }
}

function cv(varName, varValue) {
    const root = document.documentElement;
    root.style.setProperty(`--${varName}`, `${varValue}`);
}

function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(140, function () { $(dr2).fadeIn(140); });
}

function hidef(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeOut(anim);
        } else {
            $(dr1).fadeOut(170);
        }
    }
}

function showf(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeIn(anim);
        } else {
            $(dr1).fadeIn(170);
        }
    }
}

function dest(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeOut(anim, function () { dr1.remove(); });
        } else {
            $(dr1).fadeOut(170, function () { dr1.remove(); });
        }
    }
}

function toggle(elementId, time3) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === '' || element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            hidef(elementId, time3);
        }
    }
}

function masschange(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].textContent = val;
    }
}

function guestmode() {
    dest('oobespace');
    mkw(`<p>You're in Guest Mode.</p><p>Data will be destroyed on next reload.</p>`, 'WebDesk Setup');
}

function reboot(delay) {
    if (delay) {
        setTimeout(function () { window.location.reload(); }, delay);
    } else {
        window.location.reload();
    }
}

function setupd() {
    writepb('setupdone', 'y');
    writef('/system/check', 'DontModifyOrYouWillBrickWebDesk');
    reboot(400);
}

function appear(m) {
    if (m === "l") {
        cv('lightdark', `rgb(255, 255, 255, 0.65)`);
        cv('lightdark2', '#fff');
        cv('lightdark3', '#ddd');
        cv('bordercolor', 'rgba(180, 180, 180, 0.2)');
        cv('bg', '#fff');
        cv('fontc', '#000');
        cv('bgurl', 'url("./wall/light.png")');
        writef('/user/info/appear', 'light');
    } else {
        cv('lightdark', `rgb(40, 40, 40, 0.65)`);
        cv('lightdark2', '#1a1a1a');
        cv('lightdark3', '#2a2a2a');
        cv('bordercolor', 'rgba(100, 100, 100, 0.2)');
        cv('bg', '#000');
        cv('fontc', '#fff');
        cv('bgurl', 'url("./wall/dark.png")');
        writef('/user/info/appear', 'dark');
    }
}

function snack(cont, t) {
    if (!t) { t = 2500 }
    var snackElement = document.createElement("div");
    snackElement.className = "snack";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        dest(fuckyou);
    }
    setTimeout(function () { dest(fuckyou); }, t);
}

function cm(cont) {
    const snackElement = document.createElement("div");
    snackElement.className = "cm";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        setTimeout(function () { dest(fuckyou); }, 100);
    }
}