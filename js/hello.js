
var divs = document.getElementsByTagName('div');

/*
for (var i = 0, c = divs.length ; i < c ; i++)
{
	alert('Element n° ' + (i + 1) + ' : ' + divs[i]);
}
*/

var query = document.querySelector('.diapos .thumbnail');
var queryAll = document.querySelectorAll('.diapos .thumbnail');
//alert(query.innerHTML); // Affiche : "Élément 1"
//alert(queryAll.length); // Affiche : "2"
//alert(queryAll[0].innerHTML + ' - ' + queryAll[1].innerHTML); // Affiche : "Élément 1 - Élément 2"

var newLink     = document.createElement('a');
var newLinkText = document.createTextNode('Le Site du Zéro');

newLink.id  = 'sdz_link';
newLink.href = 'http://www.siteduzero.com';

newLink.appendChild(newLinkText);

// On place le nouveau lien dans le paragraphe p1
document.getElementById('p1').appendChild(newLink);

// On récupère, via son ID, l'élément fraîchement inséré
var sdzLink = document.getElementById('sdz_link');

sdzLink.href = 'http://www.siteduzero.com/forum.html';

// newLink.href affiche bien la nouvelle URL :
alert(newLink.href);


/* position de la souris */
var position = document.getElementById('position');
document.addEventListener('mousemove', function(e)
{
	position.innerHTML = 'Position X : ' + e.clientX + 'px<br />Position Y : ' + e.clientY + 'px';
}
, false);

/* Drag & Drop */
(function()
{
	var storage={};
	
	/* On place nos boites dans un tableau */
	var elements_tab= document.querySelectorAll('.draggableBox');

	for(var i=0; i< elements_tab.length; i++)
	{
		
		/* On enfonce la  souris */
		elements_tab[i].addEventListener('mousedown',function(e)
		{
			var s=storage;
			s.target=e.target; // s devient l'element ciblé par la souris
			s.offsetX= e.clientX - e.target.offsetLeft; //s.offsetX: decalage horizonntal entre souris et elt.left
			s.offsetY= e.clientY - e.target.offsetTop; // s.offsetY: idem
		},false);
		
		/* On relache la souris */
		elements_tab[i].addEventListener('mouseup',function(e)
		{
			storage={};
		},false);	
	}
	
	/* Deplacement de l'element ciblé*/
	document.addEventListener('mousemove',function(e)
	{
		var target=storage.target;
		if (target) {
                target.style.top = e.clientY - storage.offsetY + 'px';
                target.style.left = e.clientX - storage.offsetX + 'px';
            }
	},false);
	
})()
