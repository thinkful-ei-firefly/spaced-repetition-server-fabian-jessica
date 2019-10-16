const LinkedList = require('../linkedList/list');

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getHead(db, id){
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ id })
      .first()
  },

  wordsArrayToList (words, head) {
    //takes an array of words and inserts them into a linked list
    //insert the head first
    const LL = new LinkedList();
    LL.insertFirst(head);    
    //get the id of the next item in the list
    let nextNodeId = head.next;
    //then while the next pointer isn't null
    while (nextNodeId !== null) {
      //find the word whose id is equal to the previous item's next pointer
      const nextNode = words.find(word => word.id === nextNodeId)
      //and add it last
      LL.insertLast(nextNode)
      //then update the next pointer
      nextNodeId = nextNode.next
    }
    //then return the linked list
    return LL;
  },
  
  moveHeadBack (list, spaces) {
    //moves the head of a linked list back the set number of spaces
    //first, get the node at the head of the list
    const headNode = list.head
    //move the head pointer of the list forward one node
    list.head = list.head.next
    //then, traverse the list for the given number of spaces to find the insert point
    let steps = 0
    let currNode = headNode
    while (steps < spaces && currNode.next !== null) {
      currNode = currNode.next
      steps++
    }
    //insert the head node after the current node
    headNode.next = currNode.next
    currNode.next = headNode
    //adjust values of next pointers inside the node values
    currNode.value.next = headNode.value.id
    if (headNode.next === null) headNode.value.next = null
    else headNode.value.next = headNode.next.value.id
    //return the values of the nodes that had their pointers changed
    return [currNode.value, headNode.value]
  },
  
  listToWordsArray (list) {
    //takes a linked list and returns an array of words
    let currNode = list.head
    const wordArray = []
    while (currNode !== null) {
      wordArray.push(currNode.value)
      currNode = currNode.next
    }
    return wordArray
  },

  updateWord (db, id, newData) {
    return db('word')
      .where({ id })
      .update(newData)
      .returning('*')
  },

  updateHead (db, user_id, newData) {
    return db('language')
    .where({ user_id })
    .update(newData)
    .returning('*')
  }
}

module.exports = LanguageService
