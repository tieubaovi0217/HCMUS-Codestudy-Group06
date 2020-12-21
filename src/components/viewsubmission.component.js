import React, {Component, memo} from 'react';

export default class ViewSubmission extends Component    {
    constructor(props){
        super(props);
        this.state = {
            submissions: [
                {id :'00001',when: 'Dec/20/2020 16:53 UTC+7',problem:'A101 - Simple Shell ',lang:'C++',verdict:'In queue',time:'0 ms',memory:'0 KB'},
                {id :'00002',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex B ',lang:'Java',verdict:'Wrong answer',time:'0 ms',memory:'0 KB'},
                {id :'00003',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex C ',lang:'Java',verdict:'Accepted',time:'0 ms',memory:'0 KB'},
                {id :'00004',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex D ',lang:'Java',verdict:'Time limit exceeded',time:'0 ms',memory:'0 KB'},
                {id :'00005',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex E ',lang:'Java',verdict:'Compile error',time:'0 ms',memory:'0 KB'},
                {id :'00006',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex F ',lang:'Java',verdict:'Runtime error',time:'0 ms',memory:'0 KB'},
                {id :'00007',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex J ',lang:'Java',verdict:'Running',time:'0 ms',memory:'0 KB'},
                {id :'00008',when: 'Dec/20/2020 15:53 UTC+7',problem:'B102 - Complex H ',lang:'Python 3',verdict:'Memory limit exceeded ',time:'0 ms',memory:'0 KB'},

            ]
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.submissions[0])
        return header.map((key, index) => {
           return <th key={index} >{key.toUpperCase()}</th>
        })
     }

    renderTableData() {
        return this.state.submissions.map((submission, index) => {
           const { id, when,problem,lang,verdict,time,memory } = submission //destructuring
           const renderAuthButton = ()=>{
                if(verdict=='Accepted')
                {
                    return  <td class="p-3 mb-2 bg-success text-white"> {verdict}</td>
                } 
                else if (verdict =='In queue' || verdict == 'Running')
                {
                    return  <td class="p-3 mb-2 bg-secondary text-white"> {verdict}</td>
                }
                else if (verdict=='Compile error' || verdict=='Runtime error')
                {
                    return  <td class="p-3 mb-2 bg-warning text-white"> {verdict}</td>
                }
                else if (verdict == 'Wrong answer')
                {
                    return  <td class="p-3 mb-2 bg-danger text-white"> {verdict}</td>
                }
                else
                {
                    return  <td class="p-3 mb-2 bg-info text-white"> {verdict}</td>
                }
                
            }

           return (
              <tr key={id}>
                 <th scope="row"> <a class="nav-link" href=""> {id} </a></th>
                 <td>{when}</td>
                 <td> <a class="nav-link" href=""> {problem} </a> </td>
                 <td>{lang}</td>
                 {renderAuthButton()}
                 <td>{time}</td>
                 <td>{memory}</td>
              </tr>
           );
        })
     }

    render() {
        return (
            <div>
                <table class="table">

                <thead>
                  <tr> {this.renderTableHeader()} </tr> 
                </thead>

                <tbody>
                    {this.renderTableData()}
                </tbody>
                </table>

            </div>
        );
    }
}