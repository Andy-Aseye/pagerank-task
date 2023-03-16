// // This Page Rank algorithm is going to go through different steps:
// /* 
// 1. I'm setting the entire data table as an object with each website having links directed to it as an array 
// 2. The damping factor "df" is the probability that the user continues itetrativey following the links.
// 3. I'll first set an initial rank of each page, opting for a ratio divided by the number of pages.
// 4. I'll check for the links in each page and the number of page links in individual linking pages.
// 5. General rule/logic to be attained is that a page with more links of individual wighted rank should have a higher rank itself
// */


// /*In this case, Twitter is represented with T, youtube : Y, Facebook : F, Walmart: W, Amazon: A , StackOverflow: S*/


let links = {
    'A': ['T', 'Y'],
    'T': ['A', 'F', 'Y'],
    'Y': ['W', 'A', 'F', 'S'],
    'F': ['T'],
    'W': ['A', 'S'],
    'S': ['T'],
  };


  let damping = 0.88;
  pageRank(links, damping);





function pageRank(links, damping) {

    // First lets make page ranks an empty object
    let pageRanks = {};

    // We set numPages to the number of pages in the object.

    let quantityOfPages = Object.keys(links).length;

    // quantityOfPages = 3


    // Lets loop through the pages objects and set them to an initial rank

    for (let page in links) {
        pageRanks[page] = 1/ quantityOfPages;
    }

    /* {
        'A': 0.33,
        'B': 0.33,
        'C': 0.33
    } */

    // This states the number of times that should be looped over

    let numIterations = 6;

    // Below is iterated 9 times
    let i = 0;
     for (let i = 0; i < numIterations; i++) 
    // while (i > numIterations)
   {
        let newPageRanks = {};

    // Let's initiate the variable finalRank to 0;

        let finalRank = 0;

        for (let page in pageRanks) {
            let subLinks = links[page];

            // Setting incoming links to links

            /*
            ['T', 'Y'],
            ['A', 'F', 'Y'],
            ['W', 'A', 'F', 'S'],
            ['T'],
            ['A', 'S'],
    '       ['T'],
            */


            // Lets check the number of pages in an individual incoming link 
            let rank = 0;
            for (let j = 0; j < subLinks.length; j++) {
                let incomingPage = subLinks[j];
                rank += pageRanks[incomingPage] / links[incomingPage].length;
            }


            rank = (1 - damping)/ quantityOfPages + damping * rank;
            newPageRanks[page] = rank;
            finalRank += rank;
        }

        for (let page in newPageRanks) {
            newPageRanks[page] /= finalRank;
        }

        pageRanks = newPageRanks;
        // console.log(pageRanks);

        
        }

        // Setting IterationsArr to an empty array, purposely to contain value of final Rank after the last iteration


        const iterationsArr = [];

        iterationsArr.push(pageRanks)
        console.log(iterationsArr)

        return pageRanks;

        

}


// An increase in number of iterations in the tests I made provided more accurate values; Using the links data I experimented with, These are some data ranking:

/*

iterations : (3):
{
'A' : '0.13303597393956276',
'F' : '0.07694573990416895',
'S' : '0.07694573990416895',
'T' : '0.23205223659027893',
'W' : '0.1759620025548851',
'Y' : '0.30505830710693516'
}



iterations: (6):
{
'A' : '0.15302343141030858',
'F' : '0.08636665900491278',
'S' : '0.08636665900491278',
'T' : '0.22147725517355263',
'W' : '0.15482048276815683',
'Y' : '0.2979455126381562'
}


iterations: (10):

{
    'A': '0.15004977928797464',
    'F': '0.08466386452210352',
    'S': '0.08466386452210352',
    'T': '0.22306025562026965',
    'W': '0.15767434085439855',
    'Y': '0.29988789519315023',
}


With the current data structure and maximum number iterations, 
Youtube has the highest rank followed by: Twitter, Walmart, Amazon, and Facebook and Stackoverflow respectively.




*/

