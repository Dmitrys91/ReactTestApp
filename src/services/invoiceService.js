export let SelectedRows = [];

const invoiceService = {
    baseUrl: 'https://staging-api.servgrow.com/invoices',
    get: async function(skip, limit) {
        const page = skip ? (skip / 15) + 1 : 1 ;
        const response = await fetch(`${this.baseUrl}/test-page?PageNumber=${page}&PageSize=${limit}`);
        const data = await response.json(); 
        return data;  
    },

    post: async function() {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(SelectedRows)
         };
         var response = await fetch(`${this.baseUrl}/test-send`, requestOptions);
         if (response.status == 200){
           alert('Selected invoices has been sent!');
         }
    }
};

export default invoiceService;
