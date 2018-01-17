/**
 * CatsController
 *
 * @description :: Server-side logic for managing cats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    var data = req.params.all();
    if (req.isSocket && req.method === 'POST') {
      Cats.query('INSERT into `chat` (`user`,`message`) VALUES("' + data.user + '","' + data.message + '")', function (err, rows) {
        if (err) {
          sails.log(err);
          sails.log("Error occurred in database operation");
        } else {
            Cats.publishCreate({
            id: rows.insertId,
            message: data.message,
            user: data.user
          });
        }
      });
    } else if (req.isSocket) {
        Cats.watch(req.socket);
      sails.log('User subscribed to ' + req.socket.id);
    }
    if (req.method === 'GET') {
        Cats.query('SELECT * FROM `chat`', function (err, rows) {
        if (err) {
          sails.log(err);
          sails.log("Error occurred in database operation");
        } else {
          res.send(rows);
        }
      });
    }
  }
};
