$(document).ready(function() {
  // 버튼 1
  $('#button1').click(function(e) {
    e.preventDefault();

    var fileInput = $('<input type="file">');
    fileInput.on('change', function() {
      var selectedFile = fileInput[0].files[0];
      alert('Selected file: ' + selectedFile.name);
    });

    fileInput.click();
  });

  $('#button1').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 2
  $('#button2').click(function() {
    var userDocument = $('#document-input').val();

    if (userDocument) {
      var blob = new Blob([userDocument], { type: 'text/plain' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'saved_document.txt'; 
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('Please enter a document to save.');
    }
  });

  $('#button2').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 3
  $('#button3').click(function() {
    shareContent();
  });

  function shareContent() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).then(function() {
        console.log("공유 성공");
      }).catch(function(error) {
        console.error("공유 실패:", error);
      });
    } else {
      console.log("Web Share API가 지원되지 않습니다.");
    }
  }

  $('#button3').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 4
  $('#button4').click(function() {
    $('#document-input').val('');
  });

  $('#button4').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 5
  var undoStack = [];

  $('#button5').click(function() {
    if (undoStack.length > 0) {
      var previousContent = undoStack.pop();
      $('#document-input').val(previousContent);
    }
  });

  $('#document-input').on('input', function() {
    var currentContent = $(this).val();
    undoStack.push(currentContent);
  });

  $('#button5').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 6
  var undoStack = [];
  var redoStack = [];

  $('#button6').click(function() {
    if (redoStack.length > 0) {
      var previousContent = redoStack.pop();
      redoStack.push(previousContent);
      $('#document-input').val(previousContent);
    }
  });

  $('#document-input').on('input', function() {
    var currentContent = $(this).val();
    redoStack.push(currentContent);
    undoStack = [];
  });

  $('#button6').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 버튼 7, 버튼 8
  var currentZoom = 100;

  $('#button7').click(function() {
    currentZoom += 5;
    applyZoom();
  });

  $('#button8').click(function() {
    currentZoom -= 5;
    applyZoom();
  });

  function applyZoom() {
    $('#document-input').css('zoom', currentZoom + '%');
  }

  $('#button7, #button8').hover(function() {
    $(this).addClass('active');
  }, function() {
    $(this).removeClass('active');
  });

  // 파일 열기, 저장, 프린트 기능
  $('#open-link').click(function(e) {
    e.preventDefault();

    var fileInput = $('<input type="file">');
    fileInput.on('change', function() {
      var selectedFile = fileInput[0].files[0];
      alert('Selected file: ' + selectedFile.name);
    });

    fileInput.click();
  });

  $('#save-link').click(function(e) {
    e.preventDefault();

    var content = "Hello, World!";
    var filename = "example.txt";

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    $(element).appendTo('body');
    element.click();
    $(element).remove();
  });

  $('#print-link').click(function(e) {
    e.preventDefault();

    window.print();
  });

  // Undo, 전체 화면 모드
  $('#undo-link').click(function(e) {
    e.preventDefault();
    undoAction();
  });

  $(document).on('keydown', function(e) {
    if (e.ctrlKey & e.key === 'z') {
      e.preventDefault();
      undoAction();
    }
  });

  function undoAction() {
    console.log("Undo");
  }

  $('#fullscreen-link').click(function(e) {
    e.preventDefault();
    toggleFullScreen();
  });

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  // 폰트 리스트
  $('#text-button').click(function() {
    $('.dropdown-content').toggleClass('show');
  });

  var fontList = [
    { fontFamily: 'Arial', style: 'Arial, sans-serif' },
    { fontFamily: 'Verdana', style: 'Verdana, sans-serif' },
    { fontFamily: 'Helvetica', style: 'Helvetica, sans-serif' },
    { fontFamily: 'Tahoma', style: 'Tahoma, sans-serif' },
    { fontFamily: 'Trebuchet MS', style: 'Trebuchet MS, sans-serif' },
    { fontFamily: 'Georgia', style: 'Georgia, serif' },
    { fontFamily: 'Times New Roman', style: 'Times New Roman, serif' },
    { fontFamily: 'Courier New', style: 'Courier New, monospace' },
    { fontFamily: 'Arial Narrow', style: 'Arial Narrow, sans-serif' },
    { fontFamily: 'Verdana Pro', style: 'Verdana Pro, sans-serif' },
    { fontFamily: 'Roboto', style: 'Roboto, sans-serif' },
    { fontFamily: 'Open Sans', style: 'Open Sans, sans-serif' },
    { fontFamily: 'Lato', style: 'Lato, sans-serif' },
    { fontFamily: 'Montserrat', style: 'Montserrat, sans-serif' },
    { fontFamily: 'Roboto Condensed', style: 'Roboto Condensed, sans-serif' },
    { fontFamily: 'Noto Sans', style: 'Noto Sans, sans-serif' },
    { fontFamily: 'Oswald', style: 'Oswald, sans-serif' },
    { fontFamily: 'Raleway', style: 'Raleway, sans-serif' },
    { fontFamily: 'Ubuntu', style: 'Ubuntu, sans-serif' },
    { fontFamily: 'Poppins', style: 'Poppins, sans-serif' },
    { fontFamily: 'Cutive Mono', style: 'Cutive Mono, monospace' },
    { fontFamily: 'Goblin One', style: 'Goblin One, cursive' },
    { fontFamily: 'ZCOOL QingKe HuangYou', style: 'ZCOOL QingKe HuangYou, cursive' },
    { fontFamily: 'Press Start 2P', style: 'Press Start 2P, cursive' },
    { fontFamily: 'Bungee Inline', style: 'Bungee Inline, cursive' },
    { fontFamily: 'Bangers', style: 'Bangers, cursive' },
    { fontFamily: 'Baloo Bhai 2', style: 'Baloo Bhai 2, cursive' },
    { fontFamily: 'Audiowide', style: 'Audiowide, cursive' },
    { fontFamily: 'Shojumaru', style: 'Shojumaru, cursive' },
    { fontFamily: 'Big Shoulders Inline Display', style: 'Big Shoulders Inline Display, cursive' }
    // 추가적인 폰트를 여기에 추가
  ];

  var fontListHTML = fontList.map(font => `
    <a href="#" data-font="${font.fontFamily}">
      <span style="font-family: ${font.style}">${font.fontFamily}</span>
    </a>
  `).join('');

  $('#font-list').html(fontListHTML);

  $('.dropdown-content a').click(function() {
    var selectedFont = $(this).data('font');
    changeFontFamily(selectedFont);
  });

  function changeFontFamily(fontFamily) {
    $('#document-input').css('font-family', fontFamily);
    $('.dropdown-content').removeClass('show');
  }

  // 폰트 크기
  $("#font-size").click(function(e) {
    e.preventDefault();
    var size = $(this).data("size");
    $(".textarea").css("font-size", size + "px");
  });

  $("#font-size a").click(function(e) {
    e.preventDefault();
    var size = $(this).data("size");
    $("#document-input").css("font-size", size + "px");
  });

  // 흑백 모드
  const documentInput = $('#document-input');
  const darkButton = $('#dark-button');
  const body = $('body');
  const imageButtons = $('.image-button');

  function enableDarkMode() {
    console.log("enableDarkMode 호출됨");
    body.css('background-color', '#000000');
    body.css('color', '#ffffff');
    documentInput.css('background-color', '#000000');
    documentInput.css('color', '#fafcbd');
    darkButton.html('<i class="fas fa-eye"></i><span></span>');
    darkButton.addClass('active');
    imageButtons.find('img').css('filter', 'grayscale(100%)');
  }

  darkButton.click(function() {
    if (darkButton.hasClass('active')) {
      body.css('background-color', '');
      body.css('color', '');
      documentInput.css('background-color', '');
      documentInput.css('color', '');
      darkButton.html('<i class="fas fa-eye"></i><span></span>');
      darkButton.removeClass('active');
      imageButtons.find('img').css('filter', 'none');
    } else {
      enableDarkMode();
    }
  });

  imageButtons.click(function() {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(this).find('img').css('filter', 'grayscale(100%)');
    } else {
      $(this).find('img').css('filter', 'none');
    }
    body.toggleClass('dark-mode');
  });
});