$(document).ready(function () {
            
    /***** Showing Data to Edit Modal *******/      
    $('#mytable').on('click','.edit',function(){
        var product_id = $(this).data('id');
        var product_name = $(this).data('product_name');
        var product_price = $(this).data('product_price');

        $('#EditModal').modal('show');
        $('.product_name').val(product_name);
        $('.price').val(product_price);
        $('.product_id').val(product_id);
    });

    /**** Showing Delete Record Modal *****/
    $('#mytable').on('click', '.delete', function () {
        var product_id = $(this).data('id');
        $('#DeleteModal').modal('show');
        $('.product_id2').val(product_id);
    });
    
});