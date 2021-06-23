import { createSlice } from '@reduxjs/toolkit';
import axios from '../lib/axios';
import objFromArray from '../utils/objFromArray';

const initialState = {
  isLoaded: false,
  columns: {
    byId: {},
    allIds: []
  },
  cards: {
    byId: {},
    allIds: []
  },
  members: {
    byId: {},
    allIds: []
  }
};

const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoard(state, action) {
      const { board } = action.payload;

      state.columns.byId = objFromArray(board.columns);
      state.columns.allIds = Object.keys(state.columns.byId);
      state.cards.byId = objFromArray(board.cards);
      state.cards.allIds = Object.keys(state.cards.byId);
      state.members.byId = objFromArray(board.members);
      state.members.allIds = Object.keys(state.members.byId);
      state.isLoaded = true;
    },
    createColumn(state, action) {
      const { column } = action.payload;

      state.columns.byId[column.id] = column;
      state.columns.allIds.push(column.id);
    },
    updateColumn(state, action) {
      const { column } = action.payload;

      state.columns.byId[column.id] = column;
    },
    clearColumn(state, action) {
      const { columnId } = action.payload;

      // cardIds to be removed
      const { cardIds } = state.columns.byId[columnId];

      // Delete the cardIds references from the column
      state.columns.byId[columnId].cardIds = [];

      // Delete the cards from state
      cardIds.forEach((cardId) => {
        delete state.cards.byId[cardId];
      });

      state.cards.allIds = state.cards.allIds.filter((cardId) => cardIds.includes(cardId));
    },
    deleteColumn(state, action) {
      const { columnId } = action.payload;

      delete state.columns.byId[columnId];
      state.columns.allIds = state.columns.allIds.filter((_listId) => _listId !== columnId);
    },
    createCard(state, action) {
      const { card } = action.payload;

      state.cards.byId[card.id] = card;
      state.cards.allIds.push(card.id);

      // Add the cardId reference to the column
      state.columns.byId[card.columnId].cardIds.push(card.id);
    },
    updateCard(state, action) {
      const { card } = action.payload;

      Object.assign(state.cards.byId[card.id], card);
    },
    moveCard(state, action) {
      const { cardId, position, columnId } = action.payload;
      const sourceColumnId = state.cards.byId[cardId].columnId;

      // Remove card from source column
      state.columns.byId[sourceColumnId].cardIds = (
        state.columns.byId[sourceColumnId].cardIds.filter((_cardId) => _cardId !== cardId)
      );

      // If columnId exists, it means that we have to add the card to the new column
      if (columnId) {
        // Change card's columnId reference
        state.cards.byId[cardId].columnId = columnId;
        // Push the cardId to the specified position
        state.columns.byId[columnId].cardIds.splice(position, 0, cardId);
      } else {
        // Push the cardId to the specified position
        state.columns.byId[sourceColumnId].cardIds.splice(position, 0, cardId);
      }
    },
    deleteCard(state, action) {
      const { cardId } = action.payload;
      const { columnId } = state.cards.byId[cardId];

      delete state.cards.byId[cardId];
      state.cards.allIds = state.cards.allIds.filter((_cardId) => _cardId !== cardId);
      state.columns.byId[columnId].cardIds = (
        state.columns.byId[columnId].cardIds.filter((_cardId) => _cardId !== cardId)
      );
    },
    addComment(state, action) {
      const { comment } = action.payload;
      const card = state.cards.byId[comment.cardId];

      card.comments.push(comment);
    },
    addChecklist(state, action) {
      const { cardId, checklist } = action.payload;
      const card = state.cards.byId[cardId];

      card.checklists.push(checklist);
    },
    updateChecklist(state, action) {
      const { cardId, checklist } = action.payload;
      const card = state.cards.byId[cardId];

      card.checklists = card.checklists.map((_checklist) => {
        if (_checklist.id === checklist.id) {
          return checklist;
        }

        return _checklist;
      });
    },
    deleteChecklist(state, action) {
      const { cardId, checklistId } = action.payload;
      const card = state.cards.byId[cardId];

      card.checklists = card.checklists.filter((checklist) => checklist.id !== checklistId);
    },
    addCheckItem(state, action) {
      const { cardId, checklistId, checkItem } = action.payload;
      const card = state.cards.byId[cardId];
      const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

      checklist.checkItems.push(checkItem);
    },
    updateCheckItem(state, action) {
      const { cardId, checklistId, checkItem } = action.payload;
      const card = state.cards.byId[cardId];
      const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

      checklist.checkItems = checklist.checkItems.map((_checkItem) => {
        if (_checkItem.id === checkItem.id) {
          return checkItem;
        }

        return _checkItem;
      });
    },
    deleteCheckItem(state, action) {
      const { cardId, checklistId, checkItemId } = action.payload;
      const card = state.cards.byId[cardId];
      const checklist = card.checklists.find((_checklist) => _checklist.id === checklistId);

      checklist.checkItems = (
        checklist.checkItems.filter((checkItem) => checkItem.id !== checkItemId)
      );
    }
  }
});

export const { reducer } = slice;

export const getBoard = () => async (dispatch) => {
  const response = await axios.get('/api/kanban/board');

  dispatch(slice.actions.getBoard(response.data));
};

export const createColumn = (name) => async (dispatch) => {
  const response = await axios.post('/api/kanban/columns/new', {
    name
  });

  dispatch(slice.actions.createColumn(response.data));
};

export const updateColumn = (columnId, update) => async (dispatch) => {
  const response = await axios.post('/api/kanban/columns/update', {
    columnId,
    update
  });

  dispatch(slice.actions.updateColumn(response.data));
};

export const clearColumn = (columnId) => async (dispatch) => {
  await axios.post('/api/kanban/columns/clear', {
    columnId
  });

  dispatch(slice.actions.clearColumn({ columnId }));
};

export const deleteColumn = (columnId) => async (dispatch) => {
  await axios.post('/api/kanban/columns/remove', {
    columnId
  });

  dispatch(slice.actions.deleteColumn({ columnId }));
};

export const createCard = (columnId, name) => async (dispatch) => {
  const response = await axios.post('/api/kanban/cards/new', {
    columnId,
    name
  });

  dispatch(slice.actions.createCard(response.data));
};

export const updateCard = (cardId, update) => async (dispatch) => {
  const response = await axios.post('/api/kanban/cards/update', {
    cardId,
    update
  });

  dispatch(slice.actions.updateCard(response.data));
};

export const moveCard = (cardId, position, columnId) => async (dispatch) => {
  await axios.post('/api/kanban/cards/move', {
    cardId,
    position,
    columnId
  });

  dispatch(slice.actions.moveCard({
    cardId,
    position,
    columnId
  }));
};

export const deleteCard = (cardId) => async (dispatch) => {
  await axios.post('/api/kanban/cards/remove', {
    cardId
  });

  dispatch(slice.actions.deleteCard({ cardId }));
};

export const addComment = (cardId, message) => async (dispatch) => {
  const response = await axios.post('/api/kanban/comments/new', {
    cardId,
    message
  });

  dispatch(slice.actions.addComment(response.data));
};

export const addChecklist = (cardId, name) => async (dispatch) => {
  const response = await axios.post('/api/kanban/checklists/new', {
    cardId,
    name
  });
  const { checklist } = response.data;

  dispatch(slice.actions.addChecklist({
    cardId,
    checklist
  }));
};

export const updateChecklist = (cardId, checklistId, update) => async (dispatch) => {
  const response = await axios.post('/api/kanban/checklists/update', {
    cardId,
    checklistId,
    update
  });
  const { checklist } = response.data;

  dispatch(slice.actions.updateChecklist({
    cardId,
    checklist
  }));
};

export const deleteChecklist = (cardId, checklistId) => async (dispatch) => {
  await axios.post('/api/kanban/checklists/remove', {
    cardId,
    checklistId
  });

  dispatch(slice.actions.deleteChecklist({
    cardId,
    checklistId
  }));
};

export const addCheckItem = (cardId, checklistId, name) => async (dispatch) => {
  const response = await axios.post('/api/kanban/check-items/new', {
    cardId,
    checklistId,
    name
  });
  const { checkItem } = response.data;

  dispatch(slice.actions.addCheckItem({
    cardId,
    checklistId,
    checkItem
  }));
};

export const updateCheckItem = (cardId, checklistId, checkItemId, update) => async (dispatch) => {
  const response = await axios.post('/api/kanban/check-items/update', {
    cardId,
    checklistId,
    checkItemId,
    update
  });
  const { checkItem } = response.data;

  dispatch(slice.actions.updateCheckItem({
    cardId,
    checklistId,
    checkItem
  }));
};

export const deleteCheckItem = (cardId, checklistId, checkItemId) => async (dispatch) => {
  await axios.post('/api/kanban/check-items/remove', {
    cardId,
    checklistId,
    checkItemId
  });

  dispatch(slice.actions.deleteCheckItem({
    cardId,
    checklistId,
    checkItemId
  }));
};

export default slice;
