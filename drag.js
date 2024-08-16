
$(document).ready(function () {

    let scale = 1;
    const scaleStep = 0.1;
    let scaleDuring = 0;
    const minScale = 1;
    const maxScale = 2.0;
    let isDragging = false;
    let startX, startY, initialPosX, initialPosY;
  
    // Zoom In
    let image = $("#image");

    let offSetImageWidth = [];

    //Resim başlangıç width değeri
    const imageWidth = $("#image").width();
    //Resim başlangıç height değeri
    const imageHeight = $("#image").height();
    //Resmin her scale yaptıktan sonraki değişen width değeri 
    let changeableImageWidth = $("#image").width();
    //Resmin her scale yaptıktan sonraki değişen height değeri 
    let changeableImageHeight = $("#image").height();
    //Resime hiç zoom(scale) yapılmamışsa fare ile draggable özelliğini bu state ile kontrol ediceğiz
    let draggableState = [false];
    offSetImageWidth.push(imageWidth);
  
    
  
    $(".imh-6310-plus").click(function () {
      if (!isDragging && scale < maxScale) {
        scale += scaleStep;
        scaleDuring += scaleStep;
        $(".imh-6310-annotation-box-inner").css(
        "transform",
        "scale(" + scale + ")"
        );
        draggableState.forEach(e => {
            draggableState[0] = true;
        });
        offSetImageWidth[0] = (offSetImageWidth[0] + (imageWidth * scaleStep));
        
       
        changeableImageWidth = Math.round((imageWidth * scaleStep) + changeableImageWidth);
        changeableImageHeight = Math.round((imageHeight * scaleStep) + changeableImageHeight);
      }
    });
   
    // Zoom Out
    $(".imh-6310-minus").click(function () {
      if (!isDragging && scale > minScale) {
        scale -= scaleStep;
        scaleDuring -= scaleStep;
        $(".imh-6310-annotation-box-inner").css({
            transform:"scale(" + scale + ")",
            transition: "scale 0.1s ease-in-out"
      });
      offSetImageWidth[0] = (offSetImageWidth[0] - (imageWidth * scaleStep));
      changeableImageWidth = Math.round(changeableImageWidth - (imageWidth * scaleStep));
      changeableImageHeight =  Math.round(changeableImageHeight - (imageHeight * scaleStep));
    

    let boxInnerPos = $(".imh-6310-annotation-box-inner").position();

        if(Math.round(boxInnerPos.left) > -Math.round((imageWidth * scaleStep)) / 2 && boxInnerPos.top > -Math.round((imageHeight * scaleStep)) /2){
            $(".imh-6310-annotation-box-inner").css({
                left: ((changeableImageWidth -  imageWidth) / 2)+ "px",
                top: (changeableImageHeight -  imageHeight) / 2+ "px",
                });
        }
        else if(0 >(changeableImageWidth - Math.round(( imageWidth - boxInnerPos.left))) && boxInnerPos.top > -Math.round((imageHeight * scaleStep)) /2){
            $(".imh-6310-annotation-box-inner").css({
                left: (-(changeableImageWidth -  imageWidth) / 2)  + 'px',
                top: (changeableImageHeight -  imageHeight) / 2+ "px"
            })
        }else if(0 > changeableImageHeight - Math.round((imageHeight - boxInnerPos.top)) && boxInnerPos.left > -Math.round((imageWidth * scaleStep) / 2)){
            $(".imh-6310-annotation-box-inner").css({
                left: ((changeableImageWidth -  imageWidth) / 2)+ "px",
                top: -(changeableImageHeight -  imageHeight) / 2+ "px",
                });
        }else if(0 >(changeableImageWidth - Math.round(( imageWidth - boxInnerPos.left))) && 0 > changeableImageHeight - Math.round((imageHeight - boxInnerPos.top))){
            $(".imh-6310-annotation-box-inner").css({
                left: (-(changeableImageWidth -  imageWidth) / 2)  + 'px',
                top: -(changeableImageHeight -  imageHeight) / 2+ "px",
                });
        }
        else if(Math.round(boxInnerPos.left) > -Math.round((imageWidth * scaleStep)) / 2){
            $(".imh-6310-annotation-box-inner").css({
                left: (changeableImageWidth -  imageWidth) / 2+ "px",
                });

        }
        else if(0 >(changeableImageWidth - Math.round(( imageWidth - boxInnerPos.left)))){
            $(".imh-6310-annotation-box-inner").css({
                left: (-Math.round((changeableImageWidth -  imageWidth) / 2))  + 'px',
                });
        }else if(0 > changeableImageHeight - Math.round((imageHeight - boxInnerPos.top))){

            $(".imh-6310-annotation-box-inner").css({
                top: -(changeableImageHeight -  imageHeight) / 2 + "px",
                });
        }
        else if(Math.round(boxInnerPos.top) > - Math.round((imageHeight * scaleStep) /2)){

            $(".imh-6310-annotation-box-inner").css({
                top: (changeableImageHeight -  imageHeight) / 2 + "px",
                });
        }else{

        }
    }
    });

    // Start Dragging
    $(".imh-6310-annotation-box-inner").on("mousedown touchstart", function (e) {
        //e.pageX ve e.PageY internet sağlayıcı penceresinden tıklanan yere kadar olan x ve y uzunluğunu alır.
            if(draggableState.length > 0  && draggableState[0] == true){
                isDragging = true;
                startX = e.pageX || e.originalEvent.touches[0].pageX;
                startY = e.pageY || e.originalEvent.touches[0].pageY;
        
                //annotation-box ile resim arasındaki x ve y mesafesini alır
                initialPosX = parseFloat($(".imh-6310-annotation-box-inner").css("left")) || 0;
                initialPosY = parseFloat($(".imh-6310-annotation-box-inner").css("top")) || 0;
            
                e.preventDefault(); // Prevent default behavior to avoid any unexpected interactions
            }
    });

    // Perform Dragging
    $(document).on("mousemove touchmove", function (e) {
        //&& 
    if (isDragging && offSetImageWidth[0] > imageWidth) {
        let moveX = e.pageX  - startX;
        let moveY = (e.pageY ) - startY;

        let newPosX =  Math.round(initialPosX + moveX / scale) ;
        let newPosY =  Math.round(initialPosY + moveY / scale) ;
  
    const lastPos =  SettingPosXY(newPosX, newPosY);
    
        
        $(".imh-6310-annotation-box-inner").css({
        left: lastPos.newPosX + "px",
        top: lastPos.newPosY + "px",
        });
        
    }
    });

    // End Dragging
    $(document).on("mouseup touchend", function (e) {
    isDragging = false;
    });

    function SettingPosXY(newPosX, newPosY){
        if(newPosX > (changeableImageWidth -  imageWidth) / 2 && newPosY < -(changeableImageHeight -  imageHeight) / 2){
            newPosX = Math.round((imageWidth * scaleDuring) / 2);
            newPosY = -(imageHeight * scaleDuring) / 2;

        }else if(newPosX < -(changeableImageWidth -  imageWidth) / 2 && newPosY > (changeableImageHeight -  imageHeight) / 2){
            newPosX = Math.round(-(imageWidth * scaleDuring / 2));
            newPosY = (imageHeight * scaleDuring) / 2;
        }else if(newPosX > (changeableImageWidth -  imageWidth) / 2 && newPosY > (changeableImageHeight -  imageHeight) / 2){
            newPosX = Math.round((imageWidth * scaleDuring) / 2);
            newPosY = (imageHeight * scaleDuring) / 2;
        }else if(newPosX < -(changeableImageWidth -  imageWidth) / 2 && newPosY < -(changeableImageHeight -  imageHeight) / 2){
            newPosX = Math.round(-(imageWidth * scaleDuring / 2));
            newPosY = -(imageHeight * scaleDuring) / 2;
        }
        else if(newPosX > (changeableImageWidth -  imageWidth) / 2){
            newPosX = Math.round((imageWidth * scaleDuring) / 2);
        }
        else if(newPosX < -(changeableImageWidth -  imageWidth) / 2){
            newPosX = Math.round(-(imageWidth * scaleDuring / 2));
        }else if(newPosY > (changeableImageHeight -  imageHeight) / 2){
            newPosY = (imageHeight * scaleDuring) / 2;
        }else if(newPosY < -(changeableImageHeight -  imageHeight) / 2){
            newPosY = -(imageHeight * scaleDuring) / 2;
        }
        return {newPosX , newPosY}
    }
});




