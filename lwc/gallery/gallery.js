import { LightningElement, track } from 'lwc';
export default class Gallery extends LightningElement 
{
    
    @track error;

    get options() 
    {
        return [
            { label: 'Bikes', value: 'Bike' },
            { label: 'Cars', value: 'Car' },
            { label: 'Nature', value: 'Nature'} 
        ];
    }

    handleSearch()
    {
        try
        {
            let category = this.template.querySelector('lightning-combobox').value;
            let searchValue = this.template.querySelector('lightning-input').value;

            let childComp = this.template.querySelector('c-search-result');
            childComp.searchPicturesFromSearchResult(searchValue, category);
        }
        catch(e)
        {
            alert(e.message);
        }
        
    }

    errorCallback(error, stack) 
    {
        this.error = error;
        alert(this.error.message);
        console.log(this.error.message);
        console.log(this.error.body.message);
    }
}