var item_choose = document.getElementById("item_choose");
var all_elements_in_item_choose = item_choose.getElementsByTagName('*');
var only_eggroll = document.getElementById("only_eggroll");
var check_button = document.getElementById("check_button");
var state_eggroll = document.getElementById("state_eggroll");


let startX = 0;
let startY = 0;

only_eggroll.addEventListener('mousedown', dragStart);

function dragStart(e) {

    e.preventDefault();
    //記錄點擊相對被點擊物件的座標
    startX = e.clientX - only_eggroll.offsetLeft;
    startY = e.clientY - only_eggroll.offsetTop;
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
    
}
function move(e) {
    //計算出拖曳物件最左上角座標
    x = e.clientX - startX;
    y = e.clientY - startY;
    only_eggroll.style.position = "absolute";
    only_eggroll.style.left = x + 'px';
    only_eggroll.style.top = y + 'px';
    only_eggroll.style.backgroundImage = "url(./res/pulled_eggroll.png)";
    only_eggroll.style.backgroundSize = "cover";
    only_eggroll.style.width = "20vw"
    only_eggroll.style.transform = "rotate(-1deg)";
    only_eggroll.style.transform = "scale(76%)";
    only_eggroll.style.zIndex = "4";
    if (y < -150) {
        only_eggroll_drag();
    }
}
function stop() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', stop);
}


function only_eggroll_drag(){
    only_eggroll.style.opacity = 0;
    state_eggroll.style.backgroundImage = "url(./res/running_eggroll.png)";
    for(var i = 0; i < all_elements_in_item_choose.length; i++){
        all_elements_in_item_choose[i].disabled = false;
    }
    document.getElementById("arrow").style.opacity = 0;
    document.getElementById("main").style.filter = "blur(0.2vw)";


    item_choose.function = anime({
        targets: item_choose,
        translateX: '-100vw',
        easing: 'easeOutQuint',
        duration: 1000
    });

};



check_button.onclick = function(){

    async function delay() {
        for(var i = 0 ; i < 6 ; i++){
            if (i%2 == 0) {
                state_eggroll.style.backgroundImage = "url(./res/completed_move1.png)";
                state_eggroll.style.height = "127%";
                state_eggroll.style.width = "46%";
                state_eggroll.style.scale = "80%";
                state_eggroll.style.marginTop = "-8vh";
                state_eggroll.style.marginLeft = "-3vw"
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else{
                state_eggroll.style.backgroundImage = "url(./res/completed_move2.png)";
                state_eggroll.style.height = "120%";
                state_eggroll.style.width = "45%";
                state_eggroll.style.scale = "83%";
                state_eggroll.style.marginTop = "-6.5vh";
                state_eggroll.style.marginLeft = "-3vw"
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        item_choose.function = anime({
            targets: item_choose,
            translateX: '100vw',
            easing: 'easeInQuint',
            duration: 1000
        });
        await new Promise(resolve => setTimeout(resolve, 1400));
        for(var i = 0; i < all_elements_in_item_choose.length; i++){
            all_elements_in_item_choose[i].disabled = true;
        }
        document.getElementById("arrow").style.opacity = 1;
        document.getElementById("main").style.filter = "blur(0)";
        window.location.reload();
    }
    delay();



};