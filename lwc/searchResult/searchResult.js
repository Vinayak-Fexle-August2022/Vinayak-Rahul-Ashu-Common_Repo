import { LightningElement, api, track, wire } from 'lwc';
import getPictures from '@salesforce/apex/GalleryController.findPictures';

//importing pubSub properties and current page reference
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class SearchResult extends LightningElement 
{
    error;
    @track pictures;

    @track state = 
    {
        rowsExistsToDisplay: false,
        initDone: false,
    }

    connectedCallback() 
    {
        this.state.initDone = true;
    }

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    @wire (CurrentPageReference) pageRef;
    handlePreview(e)
    {
        try
        {

            let imgsrc = e.target.src;
            let imgId = e.target.id;
            let details = this.template.querySelector('p#'+imgId);
            var eventParam = {'imageSource': imgsrc, imgDetails: details.textContent};
            fireEvent(this.pageRef, 'pubsubevent', eventParam);
        }
        catch(error)
        {
            alert(error.message);
        }
    }

    @api searchPicturesFromSearchResult(searchKey, category) {
        getPictures({ searchKey: searchKey, category: category})
            .then((result) => {
                if(result.length > 0)
                {
                    console.log('@@@@@ result'+JSON.stringify(result));
                    this.state.rowsExistsToDisplay = true;
                    this.pictures = result ;
                    this.error = undefined;
                }
                else
                {
                    this.pictures = undefined;
                    alert('No Records Found...!')
                }
                

            })
            .catch((error) => {
                this.error = error;
                this.pictures = undefined;
                alert(error.message);
            });
    }
}