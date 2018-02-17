class cardHandler
{
    cardHandler();

    element imgZone;
    element displayImg;
    element[] navButtons;

    element[] infoBoxes;
    element[] infoTexts;
    element[] infoButtons;

    object-array cards;
    int currentCard;

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