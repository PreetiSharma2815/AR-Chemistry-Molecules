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
           
            electron.setAttribute("position", { x: orbitRadius, y: 1, z: orbitRadius })
            
            electronGroup.appendChild(electron);
        }        

        electronGroup.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: "true",
            dur: 2000,
        });

        //return marker;
    },

});
