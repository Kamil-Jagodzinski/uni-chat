export const tryLogin = async(logID, pass)=>{
    const neo4j = require('neo4j-driver');
    const uri = 'neo4j+s://7abcdc77.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'MyMetcQnr_IrDYzW3j5bzoLoFa_ui0rlEPCSoeO6GwQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
    var node = null;
    try {
           const result = await session.run(
              'MATCH (a:USER {idx: $idx, pass: $pass}) RETURN a',
              { idx: logID, pass: pass  }
            )
        if( result.records.length === 0 ) return null;
        else{
            const singleRecord = result.records[0]
            node = singleRecord.get(0)
        }
    }catch (e) {
        console.log(e)
    } finally {
          await session.close()
          return node; 
    }
    
};

export const tryCreateAccount = async(userID, nickname, name, surename, logID, email, bio, pass, pass2)=>{
    //walidajca
    if(userID.length === 0)             {alert('Brak nazwyID'); return null;}
    if(nickname.length === 0)           {alert('Brak nicku'); return null;} 
    if(name.length === 0)               {alert('Brak imienia'); return null;}
    if(surename.length === 0)           {alert('Brak nazwiska'); return null;} 
    if(/@agh.edu.com\s*$/.test(email))  {alert('Błędny email'); return null; } 
    if(String(logID).length !==6 )      {alert('Błędny numer indeksu'); return null; }
    if( !(pass === pass2) )              {alert('Hasła nie są takie same'); return null;}

    const neo4j = require('neo4j-driver');
    const uri = 'neo4j+s://7abcdc77.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'MyMetcQnr_IrDYzW3j5bzoLoFa_ui0rlEPCSoeO6GwQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
    var node = null;
    console.log( ' try send')
    try {
           const result = await session.run(
                'CREATE (a:USER {  userid: $userID, nickname: $nickname, '+
                'name: $name, surename: $surename, '+
                'idx: $idx, email: $email, pass: $pass, '+
                'bio: $bio, avatar: " " }) RETURN a',
                {   userID: userID, 
                    nickname: nickname, 
                    name: name, 
                    surename: surename, 
                    bio: bio,
                    email: email, 
                    idx: logID, 
                    pass: pass }
            )
            console.log(result)
            if( result.records.length === 0 ) return null;
            else{
                const singleRecord = result.records[0]
                node = singleRecord.get(0)
            }
    }catch (e) {
        console.log(e)
    }finally {
          await session.close()
          return node; 
    }
    
};

export const tryEditAccount = async(idx, userID, nickname, name, surename, bio, avatar, pass, newPass, newPass2)=>{
    //walidajca
    if(userID.length === 0)             {alert('Brak nazwyID'); return null;}
    if(nickname.length === 0)           {alert('Brak nicku'); return null;} 
    if(name.length === 0)               {alert('Brak imienia'); return null;}
    if(surename.length === 0)           {alert('Brak nazwiska'); return null;} 
    if( !(newPass === newPass2) )       {alert('Hasła nie są takie same'); return null;}
    
    var oldPassword = pass;
    var newPassword = pass;
    if( newPass === "" )  newPassword = pass;
    else newPassword = newPass

    const neo4j = require('neo4j-driver');
    const uri = 'neo4j+s://7abcdc77.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'MyMetcQnr_IrDYzW3j5bzoLoFa_ui0rlEPCSoeO6GwQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
    var node = null;

    console.log( ' try send')
    try {
           const result = await session.run(
                'MATCH (n:USER {idx: $idx, pass: $oldPassword}) '+
                ' SET n.userid = $userID '+
                ' SET n.name = $name '+
                ' SET n.surename = $surename '+
                ' SET n.nickname = $nickname '+
                ' SET n.pass = $newPassword '+
                ' SET n.avatar = $avatar '+
                ' SET n.bio = $bio '+
                ' RETURN n',
              { idx: idx, userID: userID, name: name, 
                surename: surename, nickname: nickname,
                oldPassword: oldPassword, newPassword: newPassword,
                avatar: avatar, bio: bio}
            )
            console.log(result)
            if( result.records.length === 0 ) return null;
            else{
                const singleRecord = result.records[0]
                node = singleRecord.get(0)
            }
    }catch (e) {
        console.log(e)
    }finally {
          await session.close()
          return node; 
    }  
};

export const trySend= async(idx, content)=>{

    const neo4j = require('neo4j-driver');
    const uri = 'neo4j+s://7abcdc77.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'MyMetcQnr_IrDYzW3j5bzoLoFa_ui0rlEPCSoeO6GwQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
    var node = 'OK';
    try {
            const time = new Date()
            await session.run(
              " CREATE (a:POST {content: ' "+content+"'}) "+
              " WITH a "+
              " MATCH (n:USER {idx: $idx}) "+
              " CREATE (n)-[:POSTED{send: ' "+time+"'}]->(a) ",
              { idx: idx }
            )
    }catch (e) {
        console.log(e)
        node = null
    } finally {
          await session.close()
          return node; 
    }
    
};

export const tryGetContent= async()=>{
    const neo4j = require('neo4j-driver');
    const uri = 'neo4j+s://7abcdc77.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'MyMetcQnr_IrDYzW3j5bzoLoFa_ui0rlEPCSoeO6GwQ';

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
    var node = ['ERROR'];
    try {
           const result = await session.run(
              'Match (u:USER) -[pd:POSTED]->(p:POST) ' +
              ' RETURN u.nickname, u.userid, u.avatar, ' + 
              ' u.bio, p.content, pd.send, id(pd) ' +
              ' ORDER BY id(pd) DESC; ',
            )
        if( result.records.length === 0 ) return ['ERROR'];
        else{
            node = result.records
        }
    }catch (e) {
        console.log(e)
    } finally {
          await session.close()
          return node; 
    }
}