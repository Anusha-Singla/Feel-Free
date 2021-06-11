import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { schema } from 'ngx-editor';
import { DOMSerializer } from "prosemirror-model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit {
  editorConfig: any;
  title: string;
  content: any;

  @Output('postCreated') postCreated = new EventEmitter();
  
  constructor() {
    this.editorConfig = {
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "150px",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": false,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink"/*, "image"*/],
        ["code"]
      ]
    }
  }

  ngOnInit() {
  }

  createPost() {

    //firebase.firestore().settings({
      //timestampsInSnapshots: true
    //});

    
    //Add the following code to the createPost() method
    let contentNode = schema.nodeFromJSON(this.content);
    let html: DocumentFragment = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content); 
    
    firebase.firestore().collection("posts").add({
    title: this.title,
    content: html.textContent, //add this
    owner: firebase.auth().currentUser.uid,
    created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((data) => {
    console.log(data);
    this.postCreated.emit();
    }).catch((error) => {
    console.log(error);
    });
    }
  }