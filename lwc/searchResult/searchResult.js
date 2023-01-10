import { LightningElement, api, track } from 'lwc';
import getPictures from '@salesforce/apex/GalleryController.findPictures';
export default class SearchResult extends LightningElement 
{
    error;
    pictures;
    picture;
    title;
    


    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    @api searchPicturesFromSearchResult(searchKey, category) {
        getPictures({ searchKey: searchKey, category: category})
            .then((result) => {
                this.pictures = result ;
                this.error = undefined;
                //console.log(typeof this.pictures);
                console.log(typeof this.pictures[0].Picture__c);
                console.log(this.pictures[0].Picture__c);
                this.picture  = this.pictures[0].Picture__c;
                this.picture = this.picture.substring(3,(this.picture.length)-4);

            })
            .catch((error) => {
                this.error = error;
                this.pictures = undefined;
                alert(error.message);
            });
    }
}