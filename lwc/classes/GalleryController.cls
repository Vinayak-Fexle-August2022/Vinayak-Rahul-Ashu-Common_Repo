public with sharing class GalleryController 
{
    @AuraEnabled(cacheable=true)
    public static List<Gallary__c> findPictures(String searchKey, String category) 
    {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Details__c, Picture__c, Name
            FROM Gallary__c
            WHERE Category__c =: category AND Name LIKE :key
        ];
    }
}