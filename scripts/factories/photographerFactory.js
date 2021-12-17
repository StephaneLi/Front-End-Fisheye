import PhotographerType1 from '../models/photographerType1'

// Photographer Factory : Retourne le bon model en fonction du type selectionné
export default class PhotographerFactory {
  constructor(data, type) {
    this._data = data
    this._type = type

    switch (this._type) {
      case 'type1':
        return new PhotographerType1(data)

      default:
        throw 'Type de données inconnu'
    }
  }
}