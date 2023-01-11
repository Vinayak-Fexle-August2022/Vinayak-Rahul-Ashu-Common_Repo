public with sharing class GalleryController 
{
    @AuraEnabled(cacheable=true)
    public static List<Gallary__c> findPictures(String searchKey, String category) 
    {
        String key = '%' + searchKey + '%';
        List<Gallary__c> picList= [SELECT Id, Details__c, Picture__c, Name
                            FROM Gallary__c
                            WHERE Category__c =: category AND Name LIKE :key ];
        for(Gallary__c pic: picList)
        {
            pic.Picture__c = fetchImageUrl(pic.Picture__c);
        }
        return picList;
    }
        
    public static string fetchImageUrl(String imageRichText)
    {
        Matcher imgMatcher = Pattern.compile( '<img(.+?)>' ).matcher(imageRichText);
        String img = '';
        while (imgMatcher.find())
        {                
            String imageTag = imgMatcher.group();
            img = imageTag.substringBetween(' src="', '"' );
            System.debug('img ===>' + img);
        }
        return img.unescapeHtml4();
    }
}