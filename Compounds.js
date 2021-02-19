AFRAME.registerComponent("molecules", {

    init: function () {
        this.createMolecules(3, "Na", "#9807D6", "0.1", 1)
        this.createMolecules(4, "Cl", "#78DD08", "0.08", 7)
    },

    createMolecules: function (barcodeValue, elementName, nucleusColor, nucleusRadius, numOfElectron) {

        var scene = document.querySelector('a-scene')

        //add marker
        var marker = document.createElement('a-marker');

        marker.setAttribute("id", "barcodeMarker" + barcodeValue)

        marker.setAttribute("type", "barcode")
        marker.setAttribute("value", barcodeValue)

        scene.appendChild(marker)
        
        //add molecule card
        var card = document.createElement('a-entity');
        card.setAttribute("geometry", {
            primitive: "plane",
            height: 1,
            width: 1,
        });

        card.setAttribute("material", {
            src: "./images/card-" + elementName + ".png",
        });
        card.setAttribute("position", { x: 0, y: 0, z: 0 })
        card.setAttribute("rotation", { x: -90, y: 0, z: 0 })

        marker.appendChild(card)


        //add nucleus
        var nucleus = document.createElement('a-entity');

        nucleus.setAttribute("geometry", {
            primitive: "sphere",
            radius: nucleusRadius
        });


        nucleus.setAttribute("material", "color", nucleusColor)
        nucleus.setAttribute("position", { x: 0, y: 1, z: 0 })
        nucleus.setAttribute("rotation", { x: 0, y: -Math.PI / 2, z: 0 })

        marker.appendChild(nucleus)


        //add electrons
        var electronRadius = 0.02;
        var electronGroup = document.createElement('a-entity');

        marker.appendChild(electronGroup);

        var orbitRadius = nucleusRadius + 2 * electronRadius;

        for (var n = 0; n < numOfElectron; n++) {

            var electron = document.createElement('a-entity');

            electron.setAttribute("geometry", {
                primitive: "sphere",
                radius: electronRadius
            });


            electron.setAttribute("material", "color", "yellow")
            //if (n==0)
            electron.setAttribute("position", { x: orbitRadius, y: 1, z: orbitRadius })
            //if (n==1) electron.setAttribute("position", { x:  orbitRadius-0.01 , y: 1, z: orbitRadius })
            //electron.setAttribute("position", { x:  orbitRadius*Math.cos((2*Math.PI)/numOfElectron)*n , y: 1, z: orbitRadius*Math.sin((2*Math.PI)/numOfElectron)*n })
            //electron.setAttribute({x:orbitRadius * Math.cos(n * 6.283/8),y: 1, z:orbitRadius * Math.sin(n * 6.283/8)});
            //electron.setAttribute("animation", { property: "rotation", to: " 0 360 0" })
            //console.log(electron)
            electronGroup.appendChild(electron);
        }

        //console.log(artoolkit.getMarker())

        electronGroup.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: "true",
            dur: 2000,
        });


        // marker.addEventListener('getMarker', function (ev) {
        //     console.log('found marker?', ev);
        // });

        //console.log(THREEx.ArMarkerControls)
        return marker;
    },
    tick: function(){
        this.createCompounds()
    },
    createCompounds: function () {

        var marker1Pos, marker2Pos
        
        var marker1 = document.querySelector("#barcodeMarker3")
        var marker2 = document.querySelector("#barcodeMarker4")

        
        marker1Pos = new THREE.Vector3();
        marker1.object3D.getWorldPosition(marker1Pos);
        

        marker2Pos = new THREE.Vector3();
        marker2.object3D.getWorldPosition(marker2Pos);
        
        //distance
        this.d = marker1Pos.distanceTo(marker2Pos);
        console.log("distance"+this.d)

        if(Math.round(this.d)<2){
            // this.createMolecules(4, "NaCl", "#BDE1F3", "0.08", 0)
            var c = marker2.children[0];
            c.setAttribute("material", {
                src: "./images/card-NaCl.png",
            })
        }
        else{
            var c = marker2.children[0];
            c.setAttribute("material", {
                src: "./images/card-Cl.png",
            })
        }       

    },
    updateMarker: function(){
        //if d<1
        //1--> remove electron, position nucleus
        //2--> remove e, card
        //else
        //original

        //if d<1
        //create the bond marker??

    }

});
