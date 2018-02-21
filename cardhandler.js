class cardHandler
{
    constructor()
    {
        var doc=document;

        this.imgZone=doc.querySelector(".img-zone");
        this.displayImg=this.imgZone.children[0];
        this.navButtons=this.imgZone.querySelectorAll(".nav-button");

        this.infoZone=doc.querySelector(".info-zone");
        this.infoBoxes=this.infoZone.querySelectorAll(".info-box");
        this.infoTexts=this.infoZone.querySelectorAll(".info-text");
        this.infoButtons=this.infoZone.querySelectorAll(".hide-label");

        var progressBox=this.infoZone.querySelector(".progress-box");
        progressBox.addEventListener("click",()=>{
            this.resetCards();
        });
        this.progressNumbers=progressBox.querySelectorAll("span");

        this.initEvents();

        this.cards;
        this.currentCard=0;

        this.storedNotes=window.localStorage.getItem("rm-quiz1");
        if (!this.storedNotes)
        {
            this.storedNotes={};
        }

        this.keyControl(doc);
    }

    //initialise some events
    initEvents()
    {
        //show/hide label buttons
        this.infoButtons.forEach((i,x)=>{
            i.addEventListener("click",(e)=>{
                this.infoBoxes[x].classList.add("show");
            });
        });

        this.displayImg.addEventListener("load",()=>{
            this.fitImg();
        });

        window.addEventListener("resize",()=>{
            this.fitImg();
        });

        this.navButtons[0].addEventListener("click",(e)=>{
            this.navigateCard(this.currentCard-1);
        });

        this.navButtons[1].addEventListener("click",(e)=>{
            this.navigateCard(this.currentCard+1);
        });
    }

    //reset all hide buttons to hide state
    resetInfoButtons()
    {
        this.infoBoxes[0].classList.remove("show");
        this.infoBoxes[1].classList.remove("show");
        this.infoBoxes[2].classList.remove("show");
        this.infoBoxes[3].classList.remove("show");
        this.infoBoxes[4].classList.remove("show");
    }

    //initialise key controls
    keyControl(doc)
    {
        doc.addEventListener("keydown",(e)=>{
            if (e.key=="ArrowRight")
            {
                this.navigateCard(this.currentCard+1);
            }

            else if (e.key=="ArrowLeft")
            {
                this.navigateCard(this.currentCard-1);
            }
        });
    }

    //load array of card objects
    loadData(data)
    {
        this.cards=data;
        this.progressNumbers[1].innerText=this.cards.length;
        this.resetCards();
    }

    //load the given object as a card
    loadCard(card)
    {
        this.resetInfoButtons();
        this.infoTexts[0].innerText=card.name;
        this.infoTexts[1].innerText=card.material;
        this.infoTexts[2].innerText=card.place;
        this.infoTexts[3].innerText=card.time;

        this.displayImg.src=card.img;

        if (this.storedNotes[card.id])
        {
            this.infoTexts[4].innerText=this.storedNotes[card.id];
        }

        // if (card.note)
        // {
        //     this.infoTexts[4].innerText=card.note;
        // }

        else
        {
            this.infoTexts[4].innerText="";
        }

        this.infoZone.scrollTo(0,0);
    }

    //navigate to a card at given position in current card array,
    //if position is valid. sets current card
    navigateCard(pos)
    {
        if (pos>=0 && pos<this.cards.length)
        {
            this.resetInfoButtons();
            this.loadCard(this.cards[pos]);
            this.currentCard=pos;
            this.progressNumbers[0].innerText=pos+1;
        }
    }

    //fits the current displayed image
    fitImg()
    {
        if ((this.imgZone.offsetWidth/this.imgZone.offsetHeight)>(this.displayImg.naturalWidth/this.displayImg.naturalHeight))
        {
            this.displayImg.classList.add("tall");
            this.displayImg.style.marginTop=0;
        }

        else
        {
            this.displayImg.classList.remove("tall");
            this.displayImg.style.marginTop=(this.imgZone.offsetHeight-this.displayImg.offsetHeight)/2+"px";
        }
    }

    //reset the card array and display a new card
    resetCards()
    {
        randomiseArray(this.cards);
        this.loadCard(this.cards[0]);
        this.currentCard=0;
        this.progressNumbers[0].innerText=1;
    }

    saveCurrentNote()
    {
        var noteText=this.infoTexts[4].innerText;

        if (noteText)
        {
            this.storedNotes[this.cards[this.currentCard].id]=noteText;
        }
    }
}