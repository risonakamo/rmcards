window.onload=main;

var cardhandler;

function main()
{
    cardhandler=new cardHandler();

    loadCardData("rm-quiz1.json",(res)=>{
        cardhandler.loadData(res);
    });
}

function loadCardData(datafile,callback)
{
    var r=new XMLHttpRequest();
    r.open("GET",datafile);

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response).data);
        }
    };

    r.send();
}

function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

function randomiseArray(array)
{
    var t;
    var ri;
    for (var x=array.length-1;x>0;x--)
    {
        ri=randint(0,x);
        t=array[x];
        array[x]=array[ri];
        array[ri]=t;
    }
}