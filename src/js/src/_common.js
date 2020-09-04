/**
 * --------------------------------------------------------------------------
 *  common.js
 * --------------------------------------------------------------------------
 */

// eslint-disable-next-line no-var
var front = front || {};

front.common = front.common || {};

front.common = (function () {

  var init = function () {
    this.a();
    this.inputFile();
    this.aside();
    this.commonHandler();
    this.drawer();
  };

  var a = function () {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  }

  var inputFile = function () {
    $('.custom-file-input').on('change', function () {
      let fileName = $(this).val().split('\\').pop();
      $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
      // $(this).siblings('.custom-file-label').addClass('selected').html(fileName).css({'color':'#333','border-color':'#333'});
    });
  }

  var aside = function () {

    var $depthFirst = $('._depth_first');
    var $depthSecond = $('._depth_second');

    $('#panel_aside_2').hide();

    $depthFirst.on('click', 'li', function () {

      var $tabId = $("#" + $(this).data('id'));
      var value = 'active';

      $(this).addClass(value).siblings().removeClass(value);
      $depthSecond.find('.panel').hide();
      $tabId.show().addClass(value);
      $depthSecond.find('li').eq(0).addClass(value).siblings().removeClass(value);
      $depthSecond.find('#panel_aside_1').show();
      $depthSecond.find('#panel_aside_2').hide();
    });

    $('.snb').each(function () {

      $depthBtn = $(this).find('._3depthBtn');
      $depthThird = $(this).find('._depth_third');
      $depthThirdBtn = $(this).find('._depth_third li a');


      $depthBtn.click(function () {
        if (!$(this).hasClass('active')) {
          $depthBtn.removeClass('active');
          $(this).addClass('active');
          $(this).parent().siblings().find('.fal').addClass('fa-chevron-down').removeClass('fa-chevron-up');
          $(this).find('.fal').addClass('fa-chevron-up').removeClass('fa-chevron-down');
        } else {
          $(this).removeClass('active');
          $(this).find('.fal').addClass('fa-chevron-down').removeClass('fa-chevron-up');
        }
      });

      $depthThird.click(function () {
        return false;
      });

      $depthThirdBtn.click(function () {
        if (!$(this).hasClass('active')) {
          $(this).parents().find('._depth_third li a').removeClass('active');
          $(this).addClass('active');
        }
      });
    });
  };

  var commonHandler = function () {

    // 다중 팝업 dim처리
    $(document).on('show.bs.modal', '.modal', function () {
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    });

    // 검색창
    var $inputSearch = $('._search'),
      $inputClear = $('._searchClear');

    $inputSearch.keyup(function () {
      $inputClear.toggle(Boolean($(this).val()));

      // 같은 검색 단어 컬러 변경
      var value = $(this).val();
      $("._searchList li .item-1 .text:contains('"+ value +"')").each(function () {
        var regex = new RegExp(value,'gi');
        $(this).html( $(this).text().replace(regex, "<span class='highlight'>"+value+"</span>") );
      });
    })

    $inputClear.toggle(Boolean($inputSearch.val()));

    $inputClear.on('click', function () {
      $inputSearch.val('').focus();
      $(this).hide();
    })

    // 알림 on/off - 클릭 이벤트
    $('._notice').on('click', function (){

      if($(this).hasClass('btn-main-off')) {
        $(this).removeClass('btn-main-off').addClass('btn-main-on').text('알림 ON');
        $(this).children().remove();
        $(this).prepend('<i class="sprite btn-noti-color-n-sm"></i>');
        return 0;
      }

      if($(this).hasClass('btn-main-on')){
        $(this).removeClass('btn-main-on').addClass('btn-main-off').text('알림 OFF');
        $(this).children().remove();
        $(this).prepend('<i class="sprite btn-noti-n-sm"></i>');
        return 0;
      }
    });

    /*
    -/+ count
    * */
    $('.qty-plus').on('click', function () {
      $(this).prev().val(+$(this).prev().val() + 1);
    });
    $('.qty-minus').on('click', function () {
      if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
    });

    /*
    검색창
    * */
    $('._searchBtn').on('click',function (){
      $('._searchBox').show();
    })
    $('._searchCloseBtn').on('click',function (){
      $('._searchBox').hide();
    })
  };

  var drawer = function () {

    $(function () {
      $('[data-trigger="drawer"]').on('click', function () {
        if ($(this).hasClass('show')) {
          $('.drawer').removeClass('drawer-open');
          $(this).removeClass('show');
        } else {
          $('.drawer').addClass('drawer-open');
          $(this).addClass('show');
        }
      });
      $('.drawer-mask').on('click', function () {
        $('.drawer').removeClass('drawer-open');
      });
    })
  };


  return {
    a: a,
    aside: aside,
    commonHandler: commonHandler,
    inputFile: inputFile,
    drawer: drawer,
    init: init
  }
})();

$(function () {
  front.common.init();
});

// 언어 설정
window.onload = () => {
  let koBtn = document.getElementById("koBtn");
  let enBtn = document.getElementById("enBtn");
  let setLanguage = (lang) => {
    let textList = Array.prototype.slice.call(document.querySelectorAll('[data-text]'));

    textList.map( v => {

      let child = v.firstChild;
      while (child) {
        if (child.nodeType == 3) {
          child.data = langData[lang][v.dataset.text];
          break;
        }
        child = child.nextSibling;
      }
    });

    let urlList = Array.prototype.slice.call(document.querySelectorAll('[data-url]'));
    urlList.map( v => {
      v.src = langData[lang][v.dataset.url]
    });

    let placeholderList = Array.prototype.slice.call(document.querySelectorAll('[data-placeholder]'));
    placeholderList.map( v => {
      v.placeholder = langData[lang][v.dataset.placeholder]
    });
  };
  koBtn.addEventListener("click" , () => {
    setLanguage("ko");
  });
  enBtn.addEventListener("click" , () => {
    setLanguage("en");
  });
  setLanguage("ko");
};

