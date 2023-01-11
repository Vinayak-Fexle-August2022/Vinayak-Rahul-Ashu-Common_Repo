import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener, unregisterAllListeners} from 'c/pubsub';

export default class PreviewImage extends LightningElement 
{
    @wire (CurrentPageReference) pageRef;

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
        this.imageRef = detail.imageSource;
    }
}