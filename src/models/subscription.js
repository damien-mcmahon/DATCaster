/* globals DatArchive */
class Subscription {
  subscribeToChannel(url) {
    const castArchive = new DatArchive(url);
    
    castArchive.getInfo()
      .then(info => {
        if (info) {
          //look for a channel.json - confirms this is a DATCaster
          castArchive.readFile('/channel.json')
            .then(channel => {
              //grab the 
            })
            .catch(err => console.log("NOT A CHANNEL ERR", err));
        }
      })
      .catch(err => {
        console.log("ERR getting CAST DAT", err);
      });
    //get the DAT
    //look for json file
    //parse the list for unplayed Casts
    //add channel to subscription.json
    

  }
}

export default Subscription;
