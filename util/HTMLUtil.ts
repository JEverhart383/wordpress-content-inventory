export default class HTMLUtil {
  getElementById(html, idToFind) {  
    var descendants = html.getDescendants();  
    for(var i in descendants) {
      var elt = descendants[i].asElement();
      if( elt !=null) {
        var id = elt.getAttribute('id');
        if( id !=null && id.getValue()== idToFind) return elt;    
      }
    }
  }

  getElementsByClassName(html, classToFind) {  
    var data = [];
    var descendants = html.getDescendants();
    descendants.push(html);  
    for(var i in descendants) {
      var elt = descendants[i].asElement();
      if(elt != null) {
        var classes = elt.getAttribute('class');
        if(classes != null) {
          classes = classes.getValue();
          if(classes == classToFind) data.push(elt);
          else {
            classes = classes.split(' ');
            for( var j in classes) {
              if(classes[j] == classToFind) {
                data.push(elt);
                break;
              }
            }
          }
        }
      }
    }
    return data;
  }

  getElementsByTagName(element, tagName) {  
    var data = [];
    var descendants = element.getDescendants();  
    for(var i in descendants) {
      var elt = descendants[i].asElement();     
      if( elt != null && elt.getName()== tagName) data.push(elt);      
    }
    return data;
  }
}