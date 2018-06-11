/*

■BingoMachine
75の数字をランダムで表示させるプログラム。
Javascript

■改造履歴
2017/05/04：初版リリース
2017/05/19：＠ArcCosineさん、＠foooomioさんのリファクタ有り。ありがとうございます。
2018/06/09：Vue.JSでリライト

*/

(function() {
    'use strict';

    var slotTimer;
    var drumRoll = document.getElementById('audio_drum');
    var cymbal = document.getElementById('audio_cymbal');
    var bingoNumArray = Array.from(new Array(75)).map((v, i) => i+1)
    var bingoNumer = "0";
    var setNum = "0";


    var vm = new Vue({
        el: '#app',
        data: {
            items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13','14','15',
                    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
                    '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
                    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75',],
            panel1:"0",
            panel10:"0",
            spinButton:false,
            stopButton: true,
            pStyle:"",
            bingoId:"0"
        },
        methods: {
            runSlot: function () {

                drumRoll.play();
                cymbal.pause();
                this.spinButton = true;
                this.stopButton = false;

                var bingoNum = bingoNumArray.length;
                if (bingoNum==0){
                    return;
                }

                bingoNumer = Math.floor(Math.random() * bingoNum).toString();
                setNum = bingoNumArray[bingoNumer];
                if (parseInt(setNum) < 10){
                    setNum = '0' + setNum;
                }
                setNum = setNum.toString();

                this.panel1 = setNum.substr(0, 1);
                this.panel10 = setNum.substr(1, 2); 

                slotTimer = setTimeout(this.runSlot, 25);

            },

            runStop: function () {
                clearInterval(slotTimer);
                cymbal.play();
                drumRoll.pause();
                this.spinButton = false;
                this.stopButton = true;
                cymbal.currentTime = 0;
                drumRoll.currentTime = 0;

                bingoNumArray.splice(parseInt(bingoNumer),1);
                var id = setNum;

                $('#' + id).addClass("unmatched");
            }

        },
        directives: {
            disable: function (el, binding) {
                el.disabled = binding.value
            }
        }
    });

    $("body").keypress(function (event) {
        if (event.which === 13) {
            console.log("ENTER");
            $('#spinButton').click();
            $('#stopButton').click();
        }
    });

})();