import { LightningElement, wire } from 'lwc';

import {CurrentPageReference} from 'lightning/navigation';
import {registerListener, unregisterAllListeners} from 'c/pubsub';

export default class ImageDetails extends LightningElement 
{
    @wire (CurrentPageReference) pageRef;

    imageDetails;

    imageRef;
    connectedCallback()
    {
        registerListener('pubsubevent', this.handleCallback, this);
    }

    disconnectedCallback()
    {
        unregisterAllListeners(this);
    }

    handleCallback(detail)
    {
        this.imageDetails = detail.imgDetails;
    }
}