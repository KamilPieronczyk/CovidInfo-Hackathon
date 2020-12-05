const sql = require('mysql')
const {config} = require('./Config')

class Database {
  existsProvinceToday(){
    let date = new Date().toISOString().slice(0, 10)
    let query = `select id from provincesData where DATE(date_) BETWEEN "${date} 00:00:00" AND "${date} 23:59:59" limit 1;`
    let db = this.createConnection()
    return new Promise((resolve, reject) => {
      db.connect(()=> {
        db.query(query, (e, result) => {
          db.end()
          if(result[0] != undefined)
            resolve(true)
          resolve(false)
        })
      })
    })
  }

  existsNationalRestrictionsToday(){
    let query = `select id from nationalRestrictions where DATE(date_) BETWEEN "${date} 00:00:00" AND "${date} 23:59:59" limit 1;`
    let db = this.createConnection()
    return new Promise((resolve, reject) => {
    db.connect(()=> {
        db.query(query, (e, result) => {
        db.end()
        if(result[0] != undefined)
            resolve(true)
           resolve(false)
        })
      })
    })
  }

  existsCountieToday(){
    let date = new Date().toISOString().slice(0, 10)
    let query = `select id from countiesData where DATE(date_) BETWEEN "${date} 00:00:00" AND "${date} 23:59:59" limit 1;`
    let db = this.createConnection()
    return new Promise((resolve, reject) => {
      db.connect(()=> {
        db.query(query, (e, result) => {
          db.end()
          if(result[0] != undefined)
            resolve(true)
          resolve(false)
        })
      })
    })
  }

  async addProvince(provinceData){
    let query = "INSERT INTO provincesData (province, date_, activeNumber, activeNumberPer10k, deaths, deathsWithoutIll, deathsWithIll) VALUES ("
    query += '"' + provinceData[0] + '", '
    query += '"' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '", '
    query += provinceData[1] + ', '
    query += parseFloat(provinceData[2].replace(',','.')) + ', '
    query += provinceData[3] + ', '
    query += provinceData[4] + ', '
    query += provinceData[5] + ');'
    console.log(query)
    let db = this.createConnection()
    db.connect(()=> {
      db.query(query, (e) => {
        db.end()
      })
    })
  }

  async addCountie(data){
    let query = "INSERT INTO countiesData (province, city, date_, activeNumber, activeNumberPer10k, deaths, deathsWithoutIll, deathsWithIll) VALUES ("
    query += '"' + data[0] + '", '
    query += '"' +data[1] + '", '
    query += '"' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '", '
    query += data[2] + ', '
    query += parseFloat(data[3].replace(',','.')) + ', '
    query += data[4] + ', '
    query += data[5] + ', '
    query += data[6] + ');'
    console.log(query)
    let db = this.createConnection()
    db.connect(()=> {
      db.query(query, (e) => {
        db.end()
      })
    })
  }

  createConnection(){
    return sql.createConnection(config)
  }


}

module.exports = Database