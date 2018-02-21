class cardHandler
{
    cardHandler();

    element imgZone;
    element displayImg; //current displayed img image element
    element[] navButtons;

    element[] infoBoxes;
    element[] infoTexts; //elements to load in data: [name,material,place,time,note]
    element[] infoButtons;

    element[] progressNumbers;

    object-array cards;
    int currentCard;

    object storedNotes;

    /*-- init --*/
    void initEvents();
    void keyControl(document doc);
    void loadData(array data);

    /*-- card navigation --*/
    void loadCard(object card);
    void navigateCard(int pos);

    /*-- utility --*/
    void resetInfoButtons();
    void fitImg();
    void resetCards();
}