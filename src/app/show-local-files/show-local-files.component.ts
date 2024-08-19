import { Component, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-show-local-files',
  standalone: true,
  imports: [NgFor, NgForOf],
  templateUrl: './show-local-files.component.html',
  styleUrl: './show-local-files.component.css'
})
export class ShowLocalFilesComponent implements OnInit {
  files: string[] = [];

  ngOnInit() {
    this.getFiles('.');
  }

  getFiles(path: string) {

    invoke<string[]>("get_files", { path }).then((filesArray) => {
      this.files = filesArray;
    });
  } 
}
