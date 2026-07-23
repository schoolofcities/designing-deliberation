import Papa from 'papaparse';
import { readFile } from 'node:fs/promises';

async function loadCaseStudies() {
    const contentText = await readFile(
        'static/content/case-studies.csv',
        'utf8'
    );

    const parsedContent = Papa.parse(contentText, {
        header: true,     
        encoding: "utf-8",
        skipEmptyLines: true
    });

    function processData(arr) { 
        // process anything if needed
        return arr;
    }

    return processData(parsedContent.data);
}

async function loadResources() {
    const contentText = await readFile(
        'static/content/resources.csv',
        'utf8'
    );

    const parsedContent = Papa.parse(contentText, {
        header: true,     
        encoding: "utf-8",
        skipEmptyLines: true
    });

    function processData(arr) { 
        let categories = {};
        arr.forEach((resource) => {
            const category = resource.Category;
            if (!Object.hasOwn(categories, category)) {
                categories[category] = [];
            }
            categories[category].push(resource);
        })
        return categories;
    }

    return processData(parsedContent.data);
}

async function loadConcepts() {
    const contentText = await readFile(
        'static/content/concept-library.csv',
        'utf8'
    );

    const parsedContent = Papa.parse(contentText, {
        header: true,     
        encoding: "utf-8",
        skipEmptyLines: true
    });

    function processData(arr) { 
        let alphabet = {};
        arr.forEach((concept) => {
            const letter = concept.Term[0];
            if (!Object.hasOwn(alphabet, letter)) {
                alphabet[letter] = [];
            }
            alphabet[letter].push(concept)
        })
        return alphabet;
    }

    return processData(parsedContent.data);
}

export async function load({ fetch }) {
    let scenarios = await loadCaseStudies();
    let concepts = await loadConcepts();
    let resources = await loadResources(); 

    return { scenarios: scenarios,
            concepts: concepts,
            resources: resources,
     };
}

export const prerender = true; 


